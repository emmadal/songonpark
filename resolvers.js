import { Room as room, Reservation as booking, Staff } from "./db";
import bcrypt from "bcrypt";
import { AuthenticationError } from "apollo-server";
const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");

const getToken = ({email, name }) => {
  return jwt.sign(
    { email, name },
    SECRET,
    { expiresIn: "1d" }
  );
};

export const resolvers = {
  Query: {
    rooms: () => room.find().sort({ price: 1 }),
    bookings: () => booking.find().sort({ date: -1 }),
    users: () => Staff.find().sort({ name: 1 }),
    room: (_, { id }) => {
      return room.findById(id);
    },
    booking: (_, { id }) => {
      return booking.findById(id);
    },
    user: (_, { id }) => {
      return Staff.findById(id);
    },
  },
  Mutation: {
    createReservation: async (_, { input }, context, info) => {
      const value = await JSON.parse(JSON.stringify(input));
      return await booking(value).save();
    },
    createRoom: async (_, { input }, context) => {
      if(!context.auth) throw new  AuthenticationError("Veuillez vous connecter en tant que un administrateur")
      const value = await JSON.parse(JSON.stringify(input));
      return await room(value).save();
    },
    createUser: async (_, { input }, context) => {
      if(!context.auth) throw new  AuthenticationError("Veuillez vous connecter en tant que un administrateur")
      const salt = 10;
      const value = await JSON.parse(JSON.stringify(input));
      const user = await Staff.findOne({ name: value.name });
      if (user) {
        throw new AuthenticationError("l'utilisateur existe deja!");
      }
      try {
        value.password = await bcrypt.hash(value.password, salt);
        const regUser = await Staff(value).save();
        const token = getToken(regUser);
        regUser.token = token
        return regUser
      } catch (e) {
        throw e;
      }
    },

    login: async (_, { input }) => {
      const value = await JSON.parse(JSON.stringify(input));
      const { email, password } = value
      const user = await Staff.findOne({ email });
      if (!user) throw new AuthenticationError("L'utilisateur n'existe pas!");
      try {
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new AuthenticationError("Mot de passe errone!");
        const token = getToken(user); // generate a token if no erros.
        user.token = token;
        return user;
      } catch (error) {
        throw error
      }
      
    },

    deleteRoom: async (_, { id }) => {
      await room.deleteOne({ _id: id });
      return room.find().sort({ price: 1 });
    },
    deleteReservation: async (_, { id }) => {
      await booking.deleteOne({ _id: id });
      return booking.find().sort({ date: 1 });
    },
    deleteUser: async (_, { id }) => {
      await Staff.deleteOne({ _id: id });
      return Staff.find().sort({ name: 1 });
    },
    // editRoom: async (_, { id, input }) => {
    //   try {
    //     await Room.updateOne({ _id: id }, { $set: input }, { new: true });
    //     return Room.find().sort({ date: -1 });
    //   } catch (error) {
    //     throw error;
    //   }
    // },
  },
};
