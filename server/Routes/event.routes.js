import express from "express";

import {
  getAllTeamsOfAnEvent,
  registerForEvent,
  createEvent,
  updateStatusOfAnEvent,
  getAllParticipantsOfAnEvent,
  getAllParticipatingEventsOfAUser,
} from "../Controllers/event.controller.js";

const router = express.Router();

router.post("/createEvent", createEvent);
router.get("/getAllTeamsOfAnEvent/:eventId", getAllTeamsOfAnEvent);
router.post("/registerForEvent", registerForEvent);
router.post("/updateStatusOfAnEvent", updateStatusOfAnEvent);
router.get(
  "/getAllParticipantsOfAnEvent/:eventId",
  getAllParticipantsOfAnEvent
);
router.get(
  "/getAllParticipatingEventsOfAUser/:eventId",
  getAllParticipatingEventsOfAUser
);

export default router;
