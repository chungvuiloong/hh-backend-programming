import { mutation,query } from "./_generated/server";
import { v } from "convex/values";

export const getAllFriends = query({
  args: {
    userID: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("allUsers")
      .filter((q) => q.eq(q.field("userID"), args.userID))
      .first();
      
    if (!user) {
      return [];
    }
    return user.listOfFriends;
  }
});

export const deleteFriend = mutation({
  args: {
    userID: v.string(),
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("allUsers")
      .filter((q) => q.eq(q.field("userID"), args.userID))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const currentFriends = user.listOfFriends ?? [];

    const updatedFriends = currentFriends.filter(
      (friend) => friend.id !== args.id
    );

    if (updatedFriends.length === currentFriends.length) {
      return { message: "Friend not found in list" };
    }

    await ctx.db.patch(user._id, {
      listOfFriends: updatedFriends,
    });

    return { success: true, updatedFriends };
  },
});

export const updateFriend = mutation({
    args: {
        userID: v.string(),
        friend: v.object({
            id: v.string(),
            fullname: v.string(),
            firstMeet: v.string(),
            identity: v.optional(v.string()),
            email: v.optional(v.string()),
            phoneNumber: v.optional(v.string()),
            notesAboutFriend: v.optional(v.string())
        })
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("allUsers")
            .filter((q) => q.eq(q.field("userID"), args.userID))
            .first();

        if (!user) {
            throw new Error("User not found");
        }

        const currentFriends = user.listOfFriends ?? [];

        const friendIndex = currentFriends.findIndex(
            (friend) => friend.id === args.friend.id
        );

        if (friendIndex === -1) {
            throw new Error("Friend not found in list");
        }

        currentFriends[friendIndex] = args.friend;

        await ctx.db.patch(user._id, {
            listOfFriends: currentFriends,
        });

        return { success: true, updatedFriend: args.friend };
    },
});
