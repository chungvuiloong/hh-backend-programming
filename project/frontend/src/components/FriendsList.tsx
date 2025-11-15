import { useAuth, } from '@clerk/clerk-react';
import { useFriendsWebSocket } from '../hooks/useFriendsWebSocket';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import FriendCard from '../components/FriendCard';

const FriendsList = () => {
    const { userId } = useAuth();
    // const { friends, isConnected, error } = useFriendsWebSocket(userId);

    const convexFriends = useQuery(api.friends.getAllFriends,
        userId ? { userID: userId } : "skip"
    );
    
    const deleteFriend = useMutation(api.friends.deleteFriend);
    // const updateFriend = useMutation(api.friends.updateFriend);

    // const data = isConnected ? convexFriends : friends;
    const data = convexFriends; // Always use Convex data for consistency
    
    return (
        <div>
            {Array.isArray(data) && data.length > 0 ? (
                <ul>
                    {data.map((friend, index) => (
                        <FriendCard
                            key={friend.id}
                            friend={friend}
                            userId={userId || ''}
                            deleteFriend={deleteFriend}
                        />
                    ))}
                </ul>
            ) : (
                <p>No friends found.</p>
            )}
        </div>
    );
};

export default FriendsList;
