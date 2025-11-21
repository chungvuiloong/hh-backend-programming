import { useAuth, } from '@clerk/clerk-react';
import { useFriendsWebSocket } from '../hooks/useFriendsWebSocket';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import FriendCard from '../components/FriendCard';
import FriendFormData from './interface/FriendFormData';

const FriendsList = ({ toggleModal, setFormData }: { toggleModal: (action?: 'add' | 'edit' | undefined) => void, setFormData: React.Dispatch<React.SetStateAction<FriendFormData>> }) => {
    const { userId } = useAuth();
    // const { friends, isConnected, error } = useFriendsWebSocket(userId);

    const convexFriends = useQuery(api.friends.getAllFriends,
        userId ? { userID: userId } : "skip"
    );
    
    // const deleteFriend = useMutation(api.friends.deleteFriend);

    async function deleteFriend(userID: string, id: string) {
        const url = process.env.NODE_ENV === 'production' ? 'https://friend-list-d047c88faa49.herokuapp.com' : 'http://localhost:8080';

        try {
            const response = await fetch(`${url}/convex/delete/friend/${userID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Friend-ID': id
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                throw new Error(errorData.message || `Failed to delete friend: ${response.status}`);
            }

            const result = await response.json();
            console.log('Friend deleted successfully:', result);
            return result;
        } catch (error) {
            console.error('Error deleting friend:', error);
            throw error;
        }
    }


    // const updateFriend = useMutation(api.friends.updateFriend);

    // const data = isConnected ? convexFriends : friends;
    const data = convexFriends; // Always use Convex data for consistency
    
    return (
        <div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((friend, index) => (
                        <FriendCard
                            key={friend.id}
                            friend={friend}
                            userId={userId || ''}
                            deleteFriend={deleteFriend}
                            toggleModal={toggleModal}
                            setFormData={setFormData}
                        />
                    ))
                ) : (
                    <p>No friends found.</p>
                )}
            </ul>
        </div>
    );
};

export default FriendsList;
