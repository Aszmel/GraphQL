const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Mutation = {
  async createItem(parent, args, ctx, info) {
    //TODO: check if they are logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
          // = title: args.title and so on...
        }
      },
      info
    );

    return item;
  },
  updateItem(parent, args, ctx, info) {
    //first take a copy of the updates
    const updates = { ...args };
    //remove the ID from the updates
    delete updates.id;
    //run the update methed
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the item
    const item = await ctx.db.query.item({ where }, `{id title}`);
    //2. check if they own that item, or have permissions
    //TODO
    //3. delete it
    return ctx.db.mutation.deleteItem({ where }, info);
  },
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    //now using bcrypt to hash pass - number is SALT
    //which make same pass like cat123 always have diff hashes!
    const password = await bcrypt.hash(args.password, 10);
    //create user in the database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] }
        }
      },
      info
    );
    //create a Js Web Token (JWT) for signed users
    const token = jwt.sign({ userID: user.id }, process.env.APP_SECRET);
    // we now set jwt as a cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 //1year cookie
    });
    //returning the user to the browser
    return user;
  }
};

module.exports = Mutation;
