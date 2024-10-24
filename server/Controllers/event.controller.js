import User from "../Models/user.model";
import Team from "../Models/team.model.js";
import Event from "../Models/event.model.js";
import { trusted } from "mongoose";

const getAllTeamsOfAnEvent = async (req, res, next) => {
  const { eventId } = req.params;

  if (!eventId) {
    return res.status(400).json({
      ok: false,
      msg: "eventId is missing",
    });
  }

  try {
    const event = await Event.findOne({ eventId }).populate([
      {
        path: "participatingTeams",
        model: Team,
        populate: {
          path: "acceptedMembers",
          model: User,
        },
      },
    ]);

    if (!event) {
      return res.status(400).json({
        ok: false,
        msg: "No Event with this eventId",
      });
    }

    const participatingTeams = event.participatingTeams;
    res.status(200).json({
      ok: true,
      msg: "Retrieved all teams successfully.",
      participatingTeams,
    });
  } catch (err) {
    next(err);
  }
};

const registerForEvent = async (req, res, next) => {
  const { eventId, teamId, userId } = req.body;

  if (!eventId) {
    return res.status(400).json({
      ok: false,
      msg: "eventId is missing",
    });
  }

  if (!teamId) {
    return res.status(400).json({
      ok: false,
      msg: "teamId is missing",
    });
  }

  try {
    // check if eventId is valid
    const event = await Event.findOne({ eventId }).populate({
      path: "participatingTeams",
      model: Team,
    });

    if (!event) {
      return res.status(400).json({
        ok: false,
        msg: "invalid eventId",
      });
    }
    //check is teamId is valid

    const tm = await Team.findById({ _id: teamId }).populate([
      {
        path: "acceptedMembers",
        model: User,
      },
      {
        path: "pendingMembers",
        model: User,
      },
    ]);
    if (!tm) {
      return res.status(400).json({
        ok: false,
        msg: "invalid teamId",
      });
    }
    // check if userId is valid
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "invalid userId",
      });
    }

    // check if provided user is leader or not
    const providedUserId = JSON.stringify(userId);
    const leaderId = JSON.stringify(tm.leader);

    if (providedUserId != leaderId) {
      return res.status(400).json({
        ok: false,
        msg: "you can not resgiter, only leader is allowed",
      });
    }

    // get all the members[pending  + accepted] of current Team,
    //check if there are any pending members of the currentTeam, is so then this team can not register.

    const acMembers = tm.acceptedMembers;
    const pdMembers = tm.pendingMembers;

    if (pdMembers.length > 0) {
      return res.status(400).json({
        ok: false,
        msg: "Can't register, as there are some unaccepted members in team",
      });
    }
    // check is team size is approriate for this event
    const totalLen = acMembers.length;
    if (totalLen > event.maxTeamSize) {
      return res.status(400).json({
        ok: false,
        msg: `team size is big. only ${event.maxTeamSize} members team is allowed`,
      });
    }

    if (totalLen < event.minTeamSize) {
      return res.status(400).json({
        ok: false,
        msg: `team size is small. team size shuold be atleast ${event.minTeamSize}`,
      });
    }

    //check if this team is already registered.
    if (event.participatingTeams.includes(teamId)) {
      return res.status(400).json({
        ok: false,
        msg: "Already registered",
      });
    }

    // get all the registered teams and their members of this event.
    // and check if any of the currentTeam's members are already registered with some other team
    const allTeams = event.participatingTeams;
    const allMembers = [];

    for (let i = 0; i < allTeams.length; i++) {
      const currTeam = allTeams[i];
      const currTeamMembers = currTeam.acceptedMembers;
      allMembers = [...allMembers, currTeamMembers];
    }

    const currTeamMembers = tm.acceptedMembers;

    for (let i = 0; i < currTeamMembers.length; i++) {
      if (allMembers.includes(currTeamMembers[i])) {
        return res.status(400).json({
          ok: false,
          msg: `some members of this team have already registered with other team in this event`,
        });
      }
    }
    //check if registration is open or not.

    if (!event.isOpen) {
      return res.status(400).json({
        ok: false,
        msg: "Registration is closed.",
      });
    }

    // add this team to this event.

    const currRegisteredTeams = event.participatingTeams;
    currRegisteredTeams = [...currRegisteredTeams, teamId];
    event.participatingTeams = currRegisteredTeams;

    // add this (event with team) to users participating events.

    for (let i = 0; i < tm.acceptedMembers.length; i++) {
      tm.acceptedMembers[i].participatingEvents = [
        ...tm.acceptedMembers[i].participatingEvents,
        { event: eventId, team: teamId },
      ];
    }

    // add this event to the team.

    tm.registeredEvents = [...tm.registeredEvents, eventId];

    await event.save();
    await tm.save();

    res.status(200).json({
      ok: true,
      msg: "Registered successfully!",
    });
  } catch (err) {
    next(err);
  }
};

const createEvent = async (req, res, next) => {
  const { eventId, eventName, department, maxTeamSize, minTeamSize } = req.body;

  if (!eventId || !eventName || !department || !maxTeamSize || !minTeamSize) {
    return res.status(400).json({
      ok: false,
      msg: "All fields are not present",
    });
  }

  try {
    const event = await Event.findOne({ eventId });
    if (event) {
      return res.status(400).json({
        ok: false,
        msg: "An event is already present with this id",
      });
    }

    const newEvent = await Event.create({
      eventId,
      eventName,
      department,
      maxTeamSize,
      minTeamSize,
    });

    res.status(200).json({
      ok: true,
      msg: "Created Successfully!",
      newEvent,
    });
  } catch (err) {
    next(err);
  }
};

// doesn't make any sense, leaving it.
const leaveEvent = async (req, res, next) => {
  const { teamId, eventId, userId } = req.body;
  if (!teamId) {
    return res.status(400).json({
      ok: false,
      msg: "teamId is missing",
    });
  }

  if (!eventId) {
    return res.status(400).json({
      ok: false,
      msg: "eventId  is missing",
    });
  }

  if (!userId) {
    return res.status(400).json({
      ok: false,
      msg: "userId is missing",
    });
  }

  try {
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "userId is invalid",
      });
    }

    const tm = await Team.findById({ _id: teamId });
    if (!tm) {
      return res.status(400).json({
        ok: false,
        msg: "teamId is invalid",
      });
    }

    const event = await Event.findOne({ eventId });
    if (!event) {
      return res.status(400).json({
        ok: false,
        msg: "eventId is invalid",
      });
    }

    //check if user is authorized to leave the event.

    const leaderId = JSON.stringify(tm.leader);
    const currentUserId = JSON.stringify(userId);
    if (leaderId != currentUserId) {
      return res.status(400).json({
        ok: false,
        msg: "Only leader can leave the event",
      });
    }

    // check is event is open or not

    if (!event.isOpen) {
      return res.status(400).json({
        ok: false,
        msg: "Event has been closed, can't leave the team",
      });
    }
  } catch (err) {
    next(err);
  }
};

const updateStatusOfAnEvent = async (req, res, next) => {
  const { status, userId, eventId } = req.body;

  if (!status) {
    return res.status(400).json({
      ok: false,
      msg: "status is missing",
    });
  }

  if (!userId) {
    return res.status(400).json({
      ok: false,
      msg: "userId is missing",
    });
  }

  if (!eventId) {
    return res.status(400).json({
      ok: false,
      msg: "eventId is missing",
    });
  }

  try {
    const event = await Event.findOne({ eventId });

    if (!event) {
      return res.status(400).json({
        ok: false,
        msg: "invalid eventId",
      });
    }

    event.isOpen = status;
    event.save();
    res.status(200).json({
      ok: true,
      msg: "status updated.",
    });
  } catch (err) {
    next(err);
  }
};

const getAllParticipatingEventsOfAUser = async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      ok: false,
      msg: "userId is missing",
    });
  }

  try {
    const user = await User.findById({ _id: userId })
      .populate({
        path: "participatingEvents.event", // Populating the event field
        model: Event,
      })
      .populate({
        path: "participatingEvents.team", // Populating the team field
        model: Team,
      });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User not found",
      });
    }

    const participatingEvents = user.participatingEvents;

    res.status(200).json({
      ok: true,
      msg: "successfully retrieved!",
      participatingEvents,
    });
  } catch (err) {
    next(err);
  }
};

const getAllParticipantsOfAnEvent = async (req, res, next) => {
  const { eventId } = req.params;

  if (!eventId) {
    return res.status(400).json({
      ok: false,
      msg: "eventId missing",
    });
  }

  try {
    const event = await Event.findOne({ eventId }).populate({
      path: "participatingTeams",
      model: Team,
      populate: {
        path: "acceptedMembers",
        model: User,
      },
    });

    if (!event) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid eventId",
      });
    }

    const totalTeams = event.participatingTeams;

    const members = [];

    for (let i = 0; i < totalTeams.length; i++) {
      members = [...members, totalTeams[i].acceptedMembers];
    }

    res.status(200).json({
      ok: true,
      msg: "fetched successfully!",
      members,
    });
  } catch (err) {
    next(err);
  }
};

export {
  getAllTeamsOfAnEvent,
  registerForEvent,
  createEvent,
  updateStatusOfAnEvent,
  getAllParticipatingEventsOfAUser,
  getAllParticipantsOfAnEvent,
};
