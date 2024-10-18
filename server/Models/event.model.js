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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
      },
    ],
    department: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const EventModel = mongoose.Model("Event", EventSchema);
export default EventModel;
