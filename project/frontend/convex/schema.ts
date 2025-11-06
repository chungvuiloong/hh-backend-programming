import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  locations: defineTable({
    country: v.string(),
    countryCode: v.optional(v.string()),
    city: v.string(),
    timestamp: v.number(),
  }),
});
