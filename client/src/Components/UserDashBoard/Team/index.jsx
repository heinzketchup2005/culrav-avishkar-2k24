import React, { useState } from 'react'
import UserTeams from './UesrTeams'
import TeamInfo from './TeamInfo';

function Team() {

    const [showAllTeams, setShowAllTeams] = useState(true);
    const [teamData, setTeamData] = useState({});

    const data = [{
        teamId: 1,
        name: "Team Name",
        leader: { email: "leader@gmail.com" },
    },
    {
        teamId: 2,
        name: "Team Name",
        leader: { email: "leader@gmail.com" },
    },
    {
        teamId: 3,
        name: "Team Name",
        leader: { email: "leader@gmail.com" },
    },
    {
        teamId: 4,
        name: "Team Name",
        leader: { email: "leader@gmail.com" },
    },
    {
        teamId: 5,
        name: "Team Name",
        leader: { email: "user@gmail.com" },
    },
    {
        teamId: 6,
        name: "Team Name",
        leader: { email: "user@gmail.com" },
    },
    {
        teamId: 7,
        name: "Team Name",
        leader: { email: "user@gmail.com" },

    },
    {
        teamId: 8,
        name: "Team Name",
        leader: { email: "user@gmail.com" },

    }]

    const team_Data = {
        name: "TryCatch", size: 5, members: [
            { email: "member1@gmail.com", name: "member1" },
            { email: "member2@gmail.com", name: "member2" },
            { email: "member3@gmail.com", name: "member3" }
        ],
        leader:
            { email: "leader@gmail.com", name: "leader" }
        ,
        acceptedMembers: 2,
        pendingInvites: 1,
        participatedEvents: [
            { eventName: "Event1" },
            { eventName: "Event2" },
            { eventName: "Event3" },
            { eventName: "Event4" },
            { eventName: "Event5" },
            { eventName: "Event6" }
        ]
    }

    function showTeamInfo(team) {
        setShowAllTeams(false);
        setTeamData(team_Data);
    }

    function handleShowAllTeams() {
        setShowAllTeams(true);
        setTeamData({});
    }

    return (
        <>
            {showAllTeams ?
                <div className=" md:p-0 pt-20 pb-10 h-auto px-3 md:w-[74vw] bg-[#202020]/100  custom1000:w-[80vw] custom1840:w-[83vw] w-full absolute top-[92px] flex justify-center items-center md:h-auto">
                    <div className="md:px-9 md:h-screen-minus-92 h-auto md:py-7 p-4 justify-center  bg-dark_secondary grid  border-[#202020]/100 border-2 w-full ">

                        <div className=' h-[90%] w-full'>
                            <UserTeams showTeamInfo={showTeamInfo} teamData={data} />
                        </div>
                    </div>
                </div > :
                <div className="overflow-y-scroll overflow-x-hidden md:p-0 pt-20 pb-10 h-auto px-3 md:w-[74vw] bg-[#202020]/100  custom1000:w-[80vw] custom1840:w-[83vw] w-full absolute top-[92px] flex justify-center items-center md:h-auto
                [&::-webkit-scrollbar]:w-1
                
                [&::-webkit-scrollbar-thumb]:rounded-full 
                [&::-webkit-scrollbar-thumb]:bg-Mine_Shaft_100
                custom-scrollbar">
                    <div className="md:h-screen-minus-92 h-auto justify-center  bg-dark_secondary grid  border-[#202020]/100 border-2 w-full ">
                        <TeamInfo team={teamData} handleShowAllTeams={handleShowAllTeams} />
                    </div>
                </div>
            }
        </>)
}

export default Team;