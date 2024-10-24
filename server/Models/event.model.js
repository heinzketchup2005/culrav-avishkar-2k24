import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
    },
    eventName: {
      type: String,
      required: true,
    },
    participatingTeams: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Team",
        required: true,
      },
    ],
    department: {
      type: String,
      required: true,
    },
    maxTeamSize: {
      type: Number,
      default: 1,
    },
    minTeamSize: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const EventModel = mongoose.model("Event", EventSchema);
export default EventModel;
