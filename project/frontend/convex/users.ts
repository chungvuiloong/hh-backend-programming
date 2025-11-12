import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addNewUser = mutation({
  args: {
    userID: v.string(),
    fullName: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    email: v.optional(v.string()),
    listOfFriends: v.array(
        v.object({
            fullname: v.string(),
            firstMeet: v.string(),
            identity: v.optional(v.string()),
            email: v.optional(v.string()),
            firstName: v.optional(v.string()),
            lastName: v.optional(v.string()),
            phoneNumber: v.optional(v.string()),
            notesAboutFriend: v.optional(v.string()),
        })
    ),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("allUsers", {
        userID: args.userID,
        fullName: args.fullName,
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        listOfFriends: args.listOfFriends,
        timestamp: Date.now(),
    });
    return userId;
  },
});

export const getUserByUserId = query({
  args: {
    userID: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("allUsers")
      .filter((q) => q.eq(q.field("userID"), args.userID))
      .first();
    return user;
  },
});