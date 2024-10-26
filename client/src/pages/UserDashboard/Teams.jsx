import React, { useState } from 'react'
import UserTeams from '../../Components/UserDashboard/Team/UesrTeams'

function Team() {

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

    return (
        <div>
            <UserTeams teamData={data} />
        </div>
    )
}

export default Team;