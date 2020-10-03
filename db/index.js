import mongoose from "mongoose";
const Schema = mongoose.Schema;
const staffSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  phone: {
    type: String,
    required: true,
  },

  level: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  breakfast: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  cover: {
    filename: String,
    mimetype: String,
    encoding: String,
  },
});
const reserveSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      index: { unique: true },
    },
    phone: {
      type: String,
      minlength: 8,
      maxlength: 8,
      required: true,
    },
    address: {
      type: String,
    },
    roomName: {
      type: String,
      required: true,
    },
    check_in_date: {
      type: String,
      required: true,
    },
    check_out_date: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      require: true
    }
  },
  { timestamps: true }
);
const Reservation = mongoose.model("Reservations", reserveSchema);
const Staff = mongoose.model("Users", staffSchema);
const Room = mongoose.model("Rooms", roomSchema);
export { Staff, Room, Reservation };
