import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  size: {
    type: Number,
    default: 1,
  },
  acceptedMembers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  pendingMembers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  registeredEvents: {
    type: [String],
  },
});

const TeamModel = mongoose.model("team", TeamSchema);
export default TeamModel;
