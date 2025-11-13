import { useAuth, } from '@clerk/clerk-react';
import { useFriendsWebSocket } from '../hooks/useFriendsWebSocket';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const FriendsList = () => {
    const { userId } = useAuth();
    const { friends, isConnected, error } = useFriendsWebSocket(userId);

    const convexFriends = useQuery(api.friends.getAllFriends,
        userId ? { userID: userId } : "skip"
    );

    // const data = isConnected ? convexFriends : friends;
    const data = convexFriends; // Always use Convex data for consistency
    
    return (
        <div>
            {Array.isArray(data) && data.length > 0 ? (
                <ul>
                    {data.map((friend, index) => (
                        <li key={index}>
                            <div><strong>{friend.fullname}</strong></div>
                            {friend.email && <div>Email: {friend.email}</div>}
                            {friend.phoneNumber && <div>Phone: {friend.phoneNumber}</div>}
                            <div>First met: {friend.firstMeet}</div>
                            {friend.notesAboutFriend && <div>Notes: {friend.notesAboutFriend}</div>}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No friends found.</p>
            )}
        </div>
    );
};

export default FriendsList;