//I will refractor this code after integration to frontend.

import Team from "../Models/team.model.js";
import User from "../Models/user.model.js";

//wherever [teamId and userId means objectId(_id) of the document created by mongoDB]
const createTeam = async (req, res, next) => {
  const { teamName, leader } = req.body;

  if (!teamName) {
    return res.status(400).json({
      ok: false,
      msg: "Team name is missing",
    });
  }

  if (!leader) {
    return res.status(400).json({
      ok: false,
      msg: "Leader ID is missing.",
    });
  }

  try {
    const ld = await User.findById({ _id: leader });
    if (!ld) {
      return res.status(400).json({
        ok: false,
        msg: "can't create team as leaderId is not valid or leader is not registered",
      });
    }

    const tm = await Team.findOne({ teamName, leader });

    if (tm) {
      return res.status(400).json({
        ok: false,
        msg: "Team with same name already exists",
        team: tm,
      });
    }

    const newTeam = await Team.create({ teamName, leader });
    newTeam.acceptedMembers = [...newTeam.acceptedMembers, leader];
    ld.participatingTeam = [...ld.participatingEvents, newTeam._id];
    await ld.save();
    await newTeam.save();

    return res.status(200).json({
      ok: true,
      msg: "Team Created!",
      team: newTeam,
    });
  } catch (err) {
    next(err);
  }
};

const updateTeam = async (req, res, next) => {
  const { teamId } = req.params;

  const { teamName } = req.body;

  if (!teamName) {
    return res.status(400).json({
      ok: false,
      msg: "Team name is missing.",
    });
  }
  if (!teamId) {
    return res.status(400).json({
      ok: false,
      msg: "TeamId is missing or Invalid.",
    });
  }

  try {
    const oldtm = await Team.findOne({ _id: teamId });

    if (!oldtm) {
      return res.status(400).json({
        ok: false,
        msg: "TeamId is invalid or Team Does not exist",
      });
    }

    const registeredEventsByThisTeam = oldtm.registeredEvents;
    if (registeredEventsByThisTeam.length > 0) {
      return res.status(400).json({
        ok: false,
        msg: "This team is already registered for some event/events",
      });
    }

    if (oldtm.teamName === teamName) {
      return res.status(400).json({
        ok: false,
        msg: "Same team name provided as old one",
      });
    }

    const updatedTeam = await Team.findByIdAndUpdate(
      { _id: teamId },
      { teamName: teamName },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      msg: "Updated!",
      team: updatedTeam,
    });
  } catch (err) {
    next(err);
  }
};

const deleteTeam = async (req, res, next) => {
  const { teamId } = req.params;

  if (!teamId) {
    return res.status(400).json({
      ok: false,
      msg: "Provide team ID",
    });
  }

  try {
    const tm = await Team.findById({ _id: teamId });

    if (!tm) {
      return res.status(400).json({
        ok: false,
        msg: "Team does not exist, can't delete",
      });
    }

    const registeredEventsByThisTeam = tm.registeredEvents;
    if (registeredEventsByThisTeam.length > 0) {
      return res.status(400).json({
        ok: false,
        msg: "This team is already registered for some event/events",
      });
    }

    const deletedTeam = await Team.findByIdAndDelete({ _id: teamId });

    res.status(200).json({
      ok: true,
      msg: "Deleted",
      team: deletedTeam,
    });
  } catch (err) {
    next(err);
  }
};

const sendTeamInvite = async (req, res, next) => {
  const { teamName, sendToEmail, leaderId } = req.body;

  if (!teamName) {
    return res.status(400).json({
      ok: false,
      msg: "TeamName missing",
    });
  }

  if (!sendToEmail) {
    return res.status(400).json({
      ok: false,
      msg: "sendToEmail missing",
    });
  }
  if (!leaderId) {
    return res.status(400).json({
      ok: false,
      msg: "leaderId missing",
    });
  }

  try {
    const tm = await Team.findOne({ teamName, leader: leaderId });

    if (!tm) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid team name or invalid leaderID",
      });
    }

    const targetUser = await User.findOne({ email: sendToEmail });

    if (!targetUser) {
      return res.status(400).json({
        ok: false,
        msg: "targetUser is not registered.",
      });
    }

    const targetUserId = JSON.stringify(targetUser._id);

    const acceptedMembersArray = tm.acceptedMembers;
    const pendingMembersArray = tm.pendingMembers;

    for (let i = 0; i < acceptedMembersArray.length; i++) {
      const currUserId = JSON.stringify(acceptedMembersArray[i]);
      if (targetUserId === currUserId) {
        return res.status(400).json({
          ok: false,
          msg: "User is already in the team and accepted by leader",
        });
      }
    }

    for (let i = 0; i < pendingMembersArray.length; i++) {
      const currUserId = JSON.stringify(pendingMembersArray[i]);

      if (currUserId === targetUserId) {
        return res.status(400).json({
          ok: false,
          msg: "Team Invitation Already sent.",
        });
      }
    }

    var maxTeamSize = tm.size;
    var currentTeamSize = tm.acceptedMembers.length + tm.pendingMembers.length;

    if (currentTeamSize >= maxTeamSize) {
      return res.status(400).json({
        ok: false,
        msg: "Team size is currently full",
      });
    }

    targetUser.pendingTeam = [...targetUser.pendingTeam, tm._id];
    tm.pendingMembers = [...tm.pendingMembers, targetUser._id];

    tm.save();
    targetUser.save();

    res.status(200).json({
      ok: true,
      msg: `Invite sent successfully to ${targetUser.name}`,
    });
  } catch (err) {
    next(err);
  }
};

const getAllTeamInvitesForAUser = async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      ok: false,
      msg: "userId missing",
    });
  }

  try {
    const user = await User.findById({ _id: userId })
      .populate({
        path: "pendingTeam", // Populate the teams in pending invites
        model: Team, // Reference the Team model
      })
      .exec();

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User Not found with provided userID",
      });
    }

    const pendingTeamInvites = user.pendingTeam;

    res.status(200).json({
      ok: true,
      msg: "All Invites Retrieved SuccessFully",
      teams: pendingTeamInvites,
    });
  } catch (err) {
    next(err);
  }
};

const getMembersOfATeam = async (req, res, next) => {
  const { teamId } = req.params;

  if (!teamId) {
    return res.status(400).json({
      ok: false,
      msg: "teamId missing",
    });
  }

  try {
    const acMembers = await Team.findById({ _id: teamId }).populate({
      path: "acceptedMembers",
      model: User,
    });

    const pdMembers = await Team.findById({ _id: teamId }).populate({
      path: "pendingMembers",
      model: User,
    });

    const allMembers = [
      ...acMembers.acceptedMembers,
      ...pdMembers.pendingMembers,
    ];

    res.status(200).json({
      ok: true,
      msg: "fetched successfully!",
      acceptedMembers: acMembers.acceptedMembers,
      pendingMembers: pdMembers.pendingMembers,
      allMembers: allMembers,
    });
  } catch (err) {
    next(err);
  }
};

const acceptInvite = async (req, res, next) => {
  const { userId, teamId } = req.body;

  if (!userId) {
    return res.status(400).json({
      ok: false,
      msg: "userId missing",
    });
  }

  if (!teamId) {
    return res.status(400).json({
      ok: false,
      msg: "teamId missing",
    });
  }

  try {
    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User does not exist",
      });
    }

    if (!user.isFeePaid) {
      return res.status(400).json({
        ok: false,
        msg: "First Pay the fee to accept invite",
      });
    }

    const tm = await Team.findById({ _id: teamId });

    if (!tm) {
      return res.status(400).json({
        ok: false,
        msg: "team not found",
      });
    }

    //first check if user have this invite or not
    if (!user.pendingTeam.includes(teamId)) {
      return res.status(400).json({
        ok: false,
        msg: "You dont have this invite",
      });
    }

    // then remove this team from pendingTeams of this user

    const pendingTeams = user.pendingTeam;
    const toBeRemoved = teamId;

    const newPendingTeams = pendingTeams.filter(
      (team) => JSON.stringify(team) != JSON.stringify(toBeRemoved)
    );
    user.pendingTeam = newPendingTeams;

    //then add this team to the user's participatingTeam

    const participatingTeams = user.participatingTeam;
    const newParticipatingTeams = [...participatingTeams, teamId];
    user.participatingTeam = newParticipatingTeams;

    //then remove this user from this team's pending members

    const teamPendingMembers = tm.pendingMembers;
    const toBeRemovedUser = userId;

    const newTeamPendingMembers = teamPendingMembers.filter(
      (us) => JSON.stringify(us) != JSON.stringify(toBeRemovedUser)
    );
    tm.pendingMembers = newTeamPendingMembers;

    //then add this user to the team's accepted members.
    const acceptedMembersOfTeam = tm.acceptedMembers;
    const newAcceptedMembers = [...acceptedMembersOfTeam, userId];
    tm.acceptedMembers = newAcceptedMembers;

    tm.save();
    user.save();

    res.status(200).json({
      ok: true,
      msg: "Invite Accepted!",
    });
  } catch (err) {
    next(err);
  }
};

const rejectInvite = async (req, res, next) => {
  const { userId, teamId } = req.body;

  if (!userId) {
    return res.status(400).json({
      ok: false,
      msg: "userId missing",
    });
  }

  if (!teamId) {
    return res.status(400).json({
      ok: false,
      msg: "teamId missing",
    });
  }

  try {
    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User does not exist",
      });
    }

    const tm = await Team.findById({ _id: teamId });

    if (!tm) {
      return res.status(400).json({
        ok: false,
        msg: "team not found",
      });
    }

    // first check if user have this team invite or not.
    if (!user.pendingTeam.includes(teamId)) {
      return res.status(400).json({
        ok: false,
        msg: "You dont have this invite",
      });
    }

    //then remove this user from pending members of this team
    const pendingInvites = tm.pendingMembers;

    const toBeRemovedUser = userId;
    const newPendingInvites = pendingInvites.filter(
      (us) => JSON.stringify(us) != JSON.stringify(toBeRemovedUser)
    );

    tm.pendingMembers = newPendingInvites;

    //remove this team from user's pending teams

    const pendingTeams = user.pendingTeam;
    const toBeRemovedTeam = teamId;
    const newPendingTeams = pendingTeams.filter(
      (team) => JSON.stringify(team) != JSON.stringify(toBeRemovedTeam)
    );

    user.pendingTeam = newPendingTeams;

    tm.save();
    user.save();

    res.status(200).json({
      ok: true,
      msg: "Invite Rejected!",
    });
  } catch (err) {
    next(err);
  }
};

const userProfile = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      ok: false,
      msg: "userId is missing",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User does not exist",
      });
    }

    res.status(200).json({
      ok: true,
      msg: "Fetched Successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

const updateResume = async (req, res, next) => {
  const { email, resumeLink } = req.body;

  if (!email) {
    return res.status(400).json({
      ok: false,
      msg: "missing userId",
    });
  }

  if (!resumeLink) {
    return res.status(400).json({
      ok: false,
      msg: "missing resumeLink",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "user does not exist",
      });
    }

    user.resumeLink = resumeLink;
    user.save();

    res.status(200).json({
      ok: true,
      msg: "Resume Updated!",
      user,
    });
  } catch (err) {
    next(err);
  }
};

const leaveTeam = async (req, res, next) => {
  const { userId, teamId } = req.body;

  if (!teamId) {
    return res.status(400).json({
      ok: false,
      msg: "teamId missing, can't leave this team",
    });
  }

  if (!userId) {
    return res.status(400).json({
      ok: false,
      msg: "userId missing, can't leave this team",
    });
  }

  try {
    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Not authorized to leave this team",
      });
    }

    const tm = await Team.findById({ _id: teamId });

    if (!tm) {
      return res.status(400).json({
        ok: false,
        msg: "Team does not exist",
      });
    }

    // check if this team is already registered for any event.

    const registeredEventsByThisTeam = tm.registeredEvents;
    if (registeredEventsByThisTeam.length > 0) {
      return res.status(400).json({
        ok: false,
        msg: "this team is already participating in some event/events, so can's leave team right now",
      });
    }

    // remove this user from team's accepted members

    const currentTeamAcceptedMembers = tm.acceptedMembers;
    const userToBeRemoved = userId;

    const newTeamAccptedMembers = currentTeamAcceptedMembers.filter(
      (us) => JSON.stringify(us) != JSON.stringify(userToBeRemoved)
    );

    tm.acceptedMembers = newTeamAccptedMembers;

    // remove this team from this user's participating teams.
    const userParticipatingTeams = user.participatingTeam;

    const teamToBeRemoved = teamId;
    const newUserParticipatingTeams = userParticipatingTeams.filter(
      (team) => JSON.stringify(team) != JSON.stringify(teamToBeRemoved)
    );

    user.participatingTeam = newUserParticipatingTeams;

    await tm.save();
    await user.save();
  } catch (err) {
    next(err);
  }
};

const kickMember = async (req, res, next) => {
  const { leaderId, teamId, userTobeKickedId } = req.body;
};

const getParticipatingTeamsOfAUser = async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      ok: false,
      msg: "userId is missing",
    });
  }

  try {
    const user = await User.findById({ _id: userId }).populate({
      path: "participatingTeam",
      model: Team,
    });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User does Not exist Or No Team",
      });
    }

    const acceptedTeams = user.participatingTeam;

    res.status(200).json({
      ok: true,
      msg: "fetched successfully!",
      totalTeams: acceptedTeams,
    });
  } catch (err) {
    next(err);
  }
};

export {
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
};
