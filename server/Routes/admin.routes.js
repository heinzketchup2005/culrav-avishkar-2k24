import express from "express";
import {
    getallFeePaid,
    getallFeeNotPaid,
    getallTeamEvents,
    downloadAllEventTeamMembers,
    downloadAllEventTeamMembersEventId,
    downloadAcceptedTeamMembers,
    downloadAcceptedTeamMembersEventId,
} from "../Controllers/admin.controller.js";

const router = express.Router();
router.use("/getallFeePaid", getallFeePaid);
router.use("/getallFeeNotPaid", getallFeeNotPaid);
router.use("/getallTeamEvents/:eventId", getallTeamEvents);
router.use(
    "/downloadAllEventTeamMembers/:eventId",
    downloadAllEventTeamMembersEventId
);
router.use("/downloadAllEventTeamMembers", downloadAllEventTeamMembers);
router.use(
    "/downloadAcceptedTeamMembers/:eventId",
    downloadAcceptedTeamMembersEventId
);
router.use("/downloadAcceptedTeamMembers", downloadAcceptedTeamMembers);

export default router;
