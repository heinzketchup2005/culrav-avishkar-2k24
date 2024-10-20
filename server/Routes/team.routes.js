import express from "express";
import {
  createTeam,
  updateTeam,
  deleteTeam,
  sendTeamInvite,
  getAllTeamInvitesForAUser,
  getMembersOfATeam,
  acceptInvite,
  rejectInvite,
  userProfile,
  updateResume,
  getParticipatingTeamsOfAUser,
} from "../Controllers/team.controller.js";

const router = express.Router();

//user must be logged in to access these routes .
// so first check if user is authenticated.

router.post("/createTeam", createTeam); //testing done
router.patch("/update/:teamId", updateTeam); //testing done

router.delete("/delete/:teamId", deleteTeam); // testing done

router.post("/sendTeamInvite", sendTeamInvite); //testing done
router.get("/getAllInvites/:userId", getAllTeamInvitesForAUser); //testing done
// router.get("/getAllParticipatingTeams"); // will come into event routes.
router.get("/getMembersOfATeam/:teamId", getMembersOfATeam); //testing done
// router.post("/leaveTeam");
router.post("/acceptInvite", acceptInvite); //testing done
router.post("/rejectInvite", rejectInvite); //testing done
router.get("/participatingTeamsOfAUser/:userId", getParticipatingTeamsOfAUser); //testing done
router.post("/userProfile", userProfile); //testing done
router.post("/updateResume", updateResume); //testing done
//router.post("/kickAMember")
//router.delete("/deleteTeam/:teamId")

export default router;
