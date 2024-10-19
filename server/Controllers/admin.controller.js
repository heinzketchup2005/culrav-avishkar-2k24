import User from "../Models/user.model.js";
import Event from "../Models/event.model.js";
import Team from "../Models/team.model.js";
import Errorhandler from "../ErrorHandlers/error_class.js";
import AsyncErrorHandler from "../ErrorHandlers/async_error_handler.js";

// controller to get all the users who have paid the fees
const getallFeePaid = AsyncErrorHandler(async (req, res, next) => {
    const users = await User.find({ isFeePaid: true }).lean();
    // althought the password is hashed, but still doing this
    users.map((user) => {
        delete user.password;
    });
    return res.status(200).json({
        users,
        success: true,
    });
});

// controller to get all the users who have not paid the fees
const getallFeeNotPaid = AsyncErrorHandler(async (req, res, next) => {
    const users = await User.find({ isFeePaid: false }).lean();
    // althought the password is hashed, but still doing this
    users.map((user) => {
        delete user.password;
    });
    return res.status(200).json({
        users,
        success: true,
    });
});

// controller to get all the participating teams, for an event -> eventId
const getallTeamEvents = AsyncErrorHandler(async (req, res, next) => {
    const { eventId } = req.params;
    if (typeof eventId !== "string" || eventId.trim() === "") {
        const error = new Errorhandler("Invalid eventId format", 400);
        return next(error);
    }
    if (!eventId) {
        const error = new Errorhandler("eventId not passed as params", 400);
        return next(error);
    }
    // populating the event with all the references
    const event = await Event.findOne({ eventId }).populate({
        path: "participatingTeams",
        ref: "Team",
        populate: [
            {
                path: "acceptedMembers",
                ref: "User",
            },
            {
                path: "pendingMembers",
                ref: "User",
            },
        ],
    });
    if (!event) {
        const error = new Errorhandler(
            "No event exists with the given eventId",
            404
        );
        return next(error);
    }
    return res.status(200).json({
        event,
        success: true,
    });
});

// Controllers related to excel file

// rreturn all the teams and their Members (accepted and pending) for all the events
const downloadAllEventTeamMembers = AsyncErrorHandler(
    async (req, res, next) => {
        const allEventTeams = await Team.find({}).populate({
            path: "acceptedMembers",
        });
        // no teams present
        if (!allEventTeams || allEventTeams.length == 0) {
            return res.status(200).json({
                message: "No team registered till now",
                success: true,
            });
        }
        let allEventTeamsFormatted = {};
        // formatting the data in way to help the excel file create
        allEventTeams.map((team, index) => {
            let singleTeamFormatted = {};

            //pushing all the accepted members
            team.acceptedMembers.map((member, index2) => {
                singleTeamFormatted = {
                    ...singleTeamFormatted,
                    [`Name ${index2 + 1}`]: member.name,
                    [`Email ${index2 + 1}`]: member.email,
                    [`Phone ${index2 + 1}`]: member.phone,
                    [`College ${index2 + 1}`]: member.college,
                };
            });

            // pushing all the pending members
            team.pendingMembers.map((member, index2) => {
                singleTeamFormatted = {
                    ...singleTeamFormatted,
                    [`Temp Name ${index2 + 1}`]: member.name,
                    [`Temp Email ${index2 + 1}`]: member.email,
                    [`Temp Phone ${index2 + 1}`]: member.phone,
                    [`Temp College ${index2 + 1}`]: member.college,
                };
            });
            // pushing to the parent object
            allEventTeamsFormatted = {
                ...allEventTeamsFormatted,

                [`Team ${index + 1}`]: {
                    TeamName: team.name,
                    TeamSize: team.size,
                    ...singleTeamFormatted,
                },
            };
        });
        return res.status(200).json({
            data: allEventTeamsFormatted,
            success: true,
        });
    }
);

// return all the teams and their Members (accepted and pending) for a particular event
const downloadAllEventTeamMembersEventId = AsyncErrorHandler(
    async (req, res, next) => {
        const { teamId } = req.params;
        if (!teamId) {
            const error = new Errorhandler("TeamId not present", 400);
            return next(error); // directly skipping to error handler
        }
        const allEventTeams = await Team.find({ teamId }).populate({
            path: "acceptedMembers",
        });
        // no teams present
        if (!allEventTeams || allEventTeams.length == 0) {
            return res.status(200).json({
                message: "No team registered till now",
                success: true,
            });
        }
        let allEventTeamsFormatted = {};
        // formatting the data in way to help the excel file create
        allEventTeams.map((team, index) => {
            let singleTeamFormatted = {};

            //pushing all the accepted members
            team.acceptedMembers.map((member, index2) => {
                singleTeamFormatted = {
                    ...singleTeamFormatted,
                    [`Name ${index2 + 1}`]: member.name,
                    [`Email ${index2 + 1}`]: member.email,
                    [`Phone ${index2 + 1}`]: member.phone,
                    [`College ${index2 + 1}`]: member.college,
                };
            });

            // pushing all the pending members
            team.pendingMembers.map((member, index2) => {
                singleTeamFormatted = {
                    ...singleTeamFormatted,
                    [`Temp Name ${index2 + 1}`]: member.name,
                    [`Temp Email ${index2 + 1}`]: member.email,
                    [`Temp Phone ${index2 + 1}`]: member.phone,
                    [`Temp College ${index2 + 1}`]: member.college,
                };
            });
            // pushing to the parent object
            allEventTeamsFormatted = {
                ...allEventTeamsFormatted,

                [`Team ${index + 1}`]: {
                    TeamName: team.name,
                    TeamSize: team.size,
                    ...singleTeamFormatted,
                },
            };
        });
        return res.status(200).json({
            data: allEventTeamsFormatted,
            success: true,
        });
    }
);

// return all the teams and their accepted members for all the events
const downloadAcceptedTeamMembers = AsyncErrorHandler(
    async (req, res, next) => {
        const allEventTeams = await Team.find({}).populate({
            path: "acceptedMembers",
        });
        // no teams present
        if (!allEventTeams || allEventTeams.length == 0) {
            return res.status(200).json({
                message: "No team registered till now",
                success: true,
            });
        }
        let allEventTeamsFormatted = {};
        // formatting the data in way to help the excel file create
        allEventTeams.map((team, index) => {
            let singleTeamFormatted = {};

            //pushing all the accepted members
            team.acceptedMembers.map((member, index2) => {
                singleTeamFormatted = {
                    ...singleTeamFormatted,
                    [`Name ${index2 + 1}`]: member.name,
                    [`Email ${index2 + 1}`]: member.email,
                    [`Phone ${index2 + 1}`]: member.phone,
                    [`College ${index2 + 1}`]: member.college,
                };
            });
            // pushing to the parent object
            allEventTeamsFormatted = {
                ...allEventTeamsFormatted,

                [`Team ${index + 1}`]: {
                    TeamName: team.name,
                    TeamSize: team.size,
                    ...singleTeamFormatted,
                },
            };
        });
        return res.status(200).json({
            data: allEventTeamsFormatted,
            success: true,
        });
    }
);

// return all the team and their accepted members for a particular event
const downloadAcceptedTeamMembersEventId = AsyncErrorHandler(
    async (req, res, next) => {
        const { teamId } = req.params;
        if (!teamId) {
            const error = new Errorhandler("TeamId not present", 400);
            return next(error); // directly skipping to error handler
        }
        const allEventTeams = await Team.find({ teamId }).populate({
            path: "acceptedMembers",
        });
        // no teams present
        if (!allEventTeams || allEventTeams.length == 0) {
            return res.status(200).json({
                message: "No team registered till now",
                success: true,
            });
        }
        let allEventTeamsFormatted = {};
        // formatting the data in way to help the excel file create
        allEventTeams.map((team, index) => {
            let singleTeamFormatted = {};

            //pushing all the accepted members
            team.acceptedMembers.map((member, index2) => {
                singleTeamFormatted = {
                    ...singleTeamFormatted,
                    [`Name ${index2 + 1}`]: member.name,
                    [`Email ${index2 + 1}`]: member.email,
                    [`Phone ${index2 + 1}`]: member.phone,
                    [`College ${index2 + 1}`]: member.college,
                };
            });

            // pushing to the parent object
            allEventTeamsFormatted = {
                ...allEventTeamsFormatted,

                [`Team ${index + 1}`]: {
                    TeamName: team.name,
                    TeamSize: team.size,
                    ...singleTeamFormatted,
                },
            };
        });
        return res.status(200).json({
            data: allEventTeamsFormatted,
            success: true,
        });
    }
);

export {
    getallFeePaid,
    getallFeeNotPaid,
    getallTeamEvents,
    downloadAcceptedTeamMembers,
    downloadAcceptedTeamMembersEventId,
    downloadAllEventTeamMembersEventId,
    downloadAllEventTeamMembers,
};
