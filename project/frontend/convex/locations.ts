import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Mutation to add a location (called from Java backend)
export const addLocation = mutation({
  args: {
    country: v.string(),
    city: v.string(),
    countryCode: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const locationId = await ctx.db.insert("locations", {
        country: args.country,
        city: args.city,
        timestamp: Date.now(),
        countryCode: ""
    });
    return locationId;
  },
});

// Query to get the latest location
export const getLatestLocation = query({
  args: {},
  handler: async (ctx) => {
    const locations = await ctx.db
      .query("locations")
      .order("desc")
      .take(1);

    return locations[0] || null;
  },
});

// Query to get all locations
export const getAllLocations = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("locations").order("desc").collect();
  },
});

// Query to get locations by country
export const getLocationsByCountry = query({
  args: {
    country: v.string(),
  },
  handler: async (ctx, args) => {
    const country = await ctx.db
      .query("locations")
      .filter((q) => q.eq(q.field("country"), args.country))
      .order("desc")
      .collect();
    return country;
  }
});
