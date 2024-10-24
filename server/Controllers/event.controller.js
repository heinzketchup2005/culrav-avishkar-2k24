import User from "../Models/user.model";
import Team from "../Models/team.model.js";
import Event from "../Models/event.model.js";

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
    /*
    1. check if eventId is valid
    2. check is teamId is valid
    3. check if userId is valid
    4. get all the members[pending  + accepted] of current Team
    5. get all the registered teams and their members of this event.
    6. check if there are any pending members of the currentTeam, is so then this team can not register.
    7. check if any of the currenTeam member is resgitered for the same event with different team.
    8. check if currentTeam's size follow the currentEvent's constraints.
    */
  } catch (err) {
    next(err);
  }
};

export { getAllTeamsOfAnEvent, registerForEvent };
