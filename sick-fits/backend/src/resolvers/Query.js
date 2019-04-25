const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");

const Query = {
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    //check if they're logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }
    //check if user has permission to query all users
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);
    //if user has permission, query all users
    return ctx.db.query.users({}, info);
  },
  async order(parent, args, ctx, info) {
    //check if they're logged in
    if (!ctx.request.userId) {
      throw new Error("You are not logged in");
    }
    //query the current order
    const order = await ctx.db.query.order(
      {
        where: { id: args.id }
      },
      info
    );
    //check if they has permissions to see this order
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes(
      "ADMIN"
    );
    if (!ownsOrder || !hasPermissionToSeeOrder) {
      throw new Error("You are not authorized to see the order(s)");
    }
    //return the order
    return order;
  }
};

module.exports = Query;
