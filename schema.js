import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    rooms: [Room!]!
    room(id: ID!): Room!
    bookings: [Reservation!]!
    booking(id: ID!): Reservation!
    users: [User!]!
    user(id: ID!): User!
  }

  type Room {
    id: ID!
    name: String
    capacity: Int!
    price: String!
    position: String!
    description: String!
    breakfast: String!
    quantity: String!
    cover: File
  }

  type User {
    id: ID!
    name: String!
    email: String
    level: LEVEL!
    phone: String!
    password: String!
    token: String
  }
  type Reservation {
    id: ID!
    name: String!
    email: String!
    phone: String!
    address: String
    roomName: String!
    check_in_date: String!
    check_out_date: String!
    date: String!
  }

  enum LEVEL {
    ADMINISTRATEUR
    UTILISATEUR
  }

  type File {
    filename: String
    mimetype: String
    encoding: String
  }
  input roomInput {
    name: String
    capacity: String!
    price: String!
    position: String!
    description: String!
    breakfast: String!
    quantity: String!
    cover: Upload
  }
  input reservationInput {
    name: String!
    email: String!
    phone: String!
    address: String
    roomName: String!
    check_in_date: String!
    check_out_date: String!
    date: String!
  }

  input loginInput {
    email: String!
    password: String!
  }

  input userInput {
    name: String!
    email: String
    level: LEVEL!
    phone: String!
    password: String!
  }

  type Mutation {
    createReservation(input: reservationInput!): Reservation!
    createRoom(input: roomInput!): Room!
    login(input: loginInput!): User!
    createUser(input: userInput): User!
    deleteRoom(id: ID!, input: roomInput): [Room]!
    deleteReservation(id: ID!, input: reservationInput): [Reservation]!
    deleteUser(id: ID!, input: userInput): [User]!
  }
`;
