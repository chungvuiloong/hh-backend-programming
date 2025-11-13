import { useState, useEffect, useRef } from 'react';

interface Friend {
    fullname: string;
    email?: string;
    phoneNumber?: string;
    firstMeet: string;
    notesAboutFriend?: string;
    identity?: string;
}

export const useFriendsWebSocket = (userId: string | null) => {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (!userId) {
            return;
        }

        const connectWebSocket = () => {
            const ws = new WebSocket('ws://localhost:8080/ws/friends');
            wsRef.current = ws;

            ws.onopen = () => {
                console.log('WebSocket connected');
                setIsConnected(true);
                setError(null);

                ws.send(JSON.stringify({
                    action: 'subscribe',
                    userID: userId
                }));
            };

            ws.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data);

                    if (message.type === 'FRIENDS_UPDATE') {
                        const friendsData = message.data;
                        if (friendsData.value && Array.isArray(friendsData.value)) {
                            setFriends(friendsData.value);
                        }
                    }
                } catch (err) {
                    console.error('Error parsing WebSocket message:', err);
                    setError('Error parsing server message');
                }
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                setError('WebSocket connection error');
                setIsConnected(false);
            };

            ws.onclose = () => {
                console.log('WebSocket disconnected');
                setIsConnected(false);

                setTimeout(() => {
                    console.log('Attempting to reconnect...');
                    connectWebSocket();
                }, 3000);
            };
        };

        connectWebSocket();

        // Cleanup on unmount
        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [userId]);

    return { friends, isConnected, error };
};
