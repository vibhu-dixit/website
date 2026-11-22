import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";

const stamp = v.union(v.literal("star"), v.literal("sun"), v.literal("flower"));

export const list = queryGeneric({
  args: {},
  handler: async (ctx) =>
    ctx.db
      .query("postcards")
      .withIndex("by_visible", (q) => q.eq("visible", true))
      .order("desc")
      .take(24),
});

export const submit = mutationGeneric({
  args: {
    name: v.string(),
    city: v.string(),
    message: v.string(),
    stamp,
  },
  handler: async (ctx, args) => {
    const name = args.name.trim() || "Anonymous";
    const city = args.city.trim();
    const message = args.message.trim();

    if (name.length > 40 || city.length < 2 || city.length > 40 || message.length < 1 || message.length > 180) {
      throw new Error("Please check the postcard fields and try again.");
    }

    // shortcut: cap the anonymous review queue; add bot protection if it fills routinely.
    const pending = await ctx.db
      .query("postcards")
      .withIndex("by_visible", (q) => q.eq("visible", false))
      .take(100);
    if (pending.length === 100) throw new Error("The postcard box is full. Please try again later.");

    await ctx.db.insert("postcards", {
      name,
      city,
      message,
      stamp: args.stamp,
      visible: false,
    });
  },
});
