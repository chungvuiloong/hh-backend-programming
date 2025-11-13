import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({ 
  locations: defineTable({
    country: v.string(),
    countryCode: v.optional(v.string()),
    city: v.string(),
    timestamp: v.number(),
  }),
  allUsers: defineTable({
    fullName: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    userID: v.string(),
    email: v.optional(v.string()),
    listOfFriends: v.array(
        v.object({
            id: v.string(),
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
    timestamp: v.number(),
  }),
});

