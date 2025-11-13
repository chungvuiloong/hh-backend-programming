import React from 'react';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from '@clerk/clerk-react';

const FriendsList = () => {
    const { userId } = useAuth();
    const friends = useQuery(api.friends.getAllFriends, {
    userID: userId || "",
  });

  console.log(friends);
    return (
        <div>
            
        </div>
    );
};

export default FriendsList;