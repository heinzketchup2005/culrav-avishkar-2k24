import User from "../Models/user.model.js";
import Event from "../Models/event.model.js";
import Team from "../Models/team.model.js";
import AsyncErrorHandler from "../ErrorHandlers/async_error_handler.js";

// controller to get all the users who have paid the fees
const getallFeePaid = AsyncErrorHandler(async (req, res, next) => {
    const users = await User.find({ isFeePaid: true }).lean();

    if (!users) {
        return next(new Error("Cannot find user"));
    }
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
    if (!users) {
        return next(new Error("Cannot find user"));
    }
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
        return next(new Error("Invalid eventId format"));
    }
    if (!eventId) {
        return next(Error("eventId not passed as params"));
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
        ],
    });
    if (!event) {
        const error = new Error("No event exists with the given eventId");
        return next(error);
    }
    return res.status(200).json({
        event,
        success: true,
    });
});

// Controllers related to excel file
// 1.
// rreturn all the teams and their Members (accepted and pending) for all the events
const downloadAllEventTeamMembers = AsyncErrorHandler(
    async (req, res, next) => {
        const allEvents = await Event.find({}).populate([
            {
                path: "participatingTeams",
                ref: "Team",
                populate: [
                    [
                        {
                            path: "acceptedMembers",
                            ref: "User",
                        },
                    ],
                    [
                        {
                            path: "pendingMembers",
                            ref: "User",
                        },
                    ],
                ],
            },
        ]);
        if (!allEvents) {
            return next(new Error("Cannot find events at the moment"));
        }
        // no teams present
        if (allEvents.length == 0) {
            return res.status(200).json({
                message: "No team registered till now",
                success: true,
            });
        }
        let allEventFormatted = {};
        allEvents.map((event, parentIndex) => {
            let allEventTeamsFormatted = {};
            // formatting the data in way to help the excel file create
            event.participatingTeams.map((team, index) => {
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
                        [`Pending Name ${index2 + 1}`]: member.name,
                        [`Pending Email ${index2 + 1}`]: member.email,
                        [`Pending Phone ${index2 + 1}`]: member.phone,
                        [`Pending College ${index2 + 1}`]: member.college,
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
            allEventFormatted = {
                ...allEventFormatted,
                [`${event.eventName}`]: {
                    ...allEventTeamsFormatted,
                },
            };
        });

        return res.status(200).json({
            data: allEventFormatted,
            success: true,
        });
    }
);

//2.
// return all the teams and their Members (accepted and pending) for a particular event
const downloadAllEventTeamMembersEventId = AsyncErrorHandler(
    async (req, res, next) => {
        const { eventId } = req.params;
        // console.log(eventId);
        if (!eventId) {
            return next(new Error("TeamId not present")); // skipping directly to error handler
        }
        console.log({ eventId });
        const allEvents = await Event.find({ eventId }).populate([
            {
                path: "participatingTeams",
                ref: "Team",
                populate: [
                    [
                        {
                            path: "acceptedMembers",
                            ref: "User",
                        },
                    ],
                    [
                        {
                            path: "pendingMembers",
                            ref: "User",
                        },
                    ],
                ],
            },
        ]);
        if (!allEvents) {
            return next(new Error("Cannot find events at the moment"));
        }
        // no teams present
        if (allEvents.length == 0) {
            return res.status(200).json({
                message: "No team registered till now",
                success: true,
            });
        }
        let allEventFormatted = {};
        allEvents.map((event, parentIndex) => {
            let allEventTeamsFormatted = {};
            // formatting the data in way to help the excel file create
            event.participatingTeams.map((team, index) => {
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
                        [`Pending Name ${index2 + 1}`]: member.name,
                        [`Pending Email ${index2 + 1}`]: member.email,
                        [`Pending Phone ${index2 + 1}`]: member.phone,
                        [`Pending College ${index2 + 1}`]: member.college,
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
            allEventFormatted = {
                ...allEventFormatted,
                [`${event.eventName}`]: {
                    ...allEventTeamsFormatted,
                },
            };
        });

        return res.status(200).json({
            data: allEventFormatted,
            success: true,
        });
    }
);

//3.
// return all the teams and their accepted members for all the events
const downloadAcceptedTeamMembers = AsyncErrorHandler(
    async (req, res, next) => {
        const allEvents = await Event.find({}).populate([
            {
                path: "participatingTeams",
                ref: "Team",
                populate: [
                    {
                        path: "acceptedMembers",
                        ref: "User",
                    },
                ],
            },
        ]);
        if (!allEvents) {
            return next(new Error("Cannot find events at the moment"));
        }
        // no teams present
        if (allEvents.length == 0) {
            return res.status(200).json({
                message: "No team registered till now",
                success: true,
            });
        }
        let allEventFormatted = {};
        allEvents.map((event, parentIndex) => {
            let allEventTeamsFormatted = {};
            // formatting the data in way to help the excel file create
            event.participatingTeams.map((team, index) => {
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
            allEventFormatted = {
                ...allEventFormatted,
                [`${event.eventName}`]: {
                    ...allEventTeamsFormatted,
                },
            };
        });

        return res.status(200).json({
            data: allEventFormatted,
            success: true,
        });
    }
);

// 4.
// return all the team and their accepted members for a particular event
const downloadAcceptedTeamMembersEventId = AsyncErrorHandler(
    async (req, res, next) => {
        console.log("downloadAllEventTeamMembersEventId");
        const { eventId } = req.params;
        if (!eventId) {
            return next(new Error("TeamId not present")); // skipping directly to error handler
        }
        const allEvents = await Event.find({ eventId }).populate([
            {
                path: "participatingTeams",
                ref: "Team",
                populate: [
                    {
                        path: "acceptedMembers",
                        ref: "User",
                    },
                ],
            },
        ]);
        if (!allEvents) {
            return next(new Error("Cannot find events at the moment"));
        }
        // no teams present
        if (allEvents.length == 0) {
            return res.status(200).json({
                message: "No team registered till now",
                success: true,
            });
        }
        let allEventFormatted = {};
        allEvents.map((event, parentIndex) => {
            let allEventTeamsFormatted = {};
            // formatting the data in way to help the excel file create
            event.participatingTeams.map((team, index) => {
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
            allEventFormatted = {
                ...allEventFormatted,
                [`${event.eventName}`]: {
                    ...allEventTeamsFormatted,
                },
            };
        });

        return res.status(200).json({
            data: allEventFormatted,
            success: true,
        });
    }
);

export {
    getallFeePaid,
    getallFeeNotPaid,
    getallTeamEvents,
    downloadAllEventTeamMembers,
    downloadAllEventTeamMembersEventId,
    downloadAcceptedTeamMembers,
    downloadAcceptedTeamMembersEventId,
};
