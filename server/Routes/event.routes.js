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

router.post("/createEvent", createEvent); //testing Done
router.get("/getAllTeamsOfAnEvent/:eventId", getAllTeamsOfAnEvent); //testing Done
router.post("/registerForEvent", registerForEvent); //testing Done
router.post("/updateStatusOfAnEvent", updateStatusOfAnEvent); //testing Done
router.get(
  "/getAllParticipantsOfAnEvent/:eventId",
  getAllParticipantsOfAnEvent
);
router.get(
  "/getAllParticipatingEventsOfAUser/:eventId",
  getAllParticipatingEventsOfAUser
);

export default router;
