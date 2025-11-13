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
