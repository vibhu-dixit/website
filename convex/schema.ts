import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  postcards: defineTable({
    name: v.string(),
    city: v.string(),
    message: v.string(),
    stamp: v.union(v.literal("star"), v.literal("sun"), v.literal("flower")),
    visible: v.boolean(),
  }).index("by_visible", ["visible"]),
});
