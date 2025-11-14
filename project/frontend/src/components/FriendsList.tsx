import { useAuth, } from '@clerk/clerk-react';
import { useFriendsWebSocket } from '../hooks/useFriendsWebSocket';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

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
                        <li key={index}>
                            <div><strong>{friend.fullname}</strong></div>
                            {friend.email && <div>Email: {friend.email}</div>}
                            {friend.phoneNumber && <div>Phone: {friend.phoneNumber}</div>}
                            <div>First met: {friend.firstMeet}</div>
                            {friend.identity && <div>Identity: {friend.identity}</div>}
                            {friend.notesAboutFriend && <div>Notes: {friend.notesAboutFriend}</div>}
                            <button onClick={async () => {
                                if (!userId) {
                                    console.error("User not authenticated");
                                    return;
                                }
                                await deleteFriend({
                                    userID: userId,
                                    id: friend.id
                                });
                            }}>
                                Delete Friend
                            </button>
                            {/* <button onClick={async () => {
                                if (!userId) {
                                    console.error("User not authenticated");
                                    return;
                                }
                                await updateFriend({
                                    userID: userId,
                                    friend: friend
                                });
                            }}>Edit</button> */}
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
