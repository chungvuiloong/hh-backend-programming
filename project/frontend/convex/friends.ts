import { query } from "./_generated/server";
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
