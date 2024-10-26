import React, { useState } from 'react'
import { Button } from "@/ShadCnComponents/ui/button"
import ScrollableDiv from "@/Components/UserDashboard/shared/ScrollableDiv"
import { useNavigate } from "react-router-dom"
import Alert from '../shared/Alert'

function UserTeams({ teamData, showTeamInfo }) {

    const [openDeleteTeamModal, setOpenDeleteTeamModal] = useState(false);

    const navigate = useNavigate();

    function handleDeleteTeam() {

    }

    function handleSelectTeam(team) {
        console.log(team)
        showTeamInfo(team);
    }

    function openDeleteModal(e) {
        e.stopPropagation();
        e.preventDefault();
        setOpenDeleteTeamModal(true);
    }

    const userEmail = "user@gmail.com"
    const createdTeams = teamData.filter(team => team.leader.email === userEmail)
    const joinedTeams = teamData.filter(team => !team.leader.email !== userEmail)

    return (
        <div className="md:w-[50vw]  lg:w-full  h-full flex flex-col lg:flex-row gap-10 lg:gap-5 ">

            {createdTeams.length > 0 &&
                <ScrollableDiv title="My teams">
                    {createdTeams.map((team) => {
                        return (
                            <div onClick={() => handleSelectTeam(team)} className="cursor-pointer mb-3 h-auto w-full px-5 py-4 bg-Mine_Shaft_900 rounded justify-between items-center inline-flex
            transition-all duration-300 ease-in-out transform hover:scale-95 hover:shadow-xl
                            ">
                                <div className="text-Mine_Shaft_300 text-lg font-normal font-sfText leading-tight">{team.name}</div>
                                <Button className="z-5 text-Mine_Shaft_100 text-lg bg-customRed hover:bg-red-500 px-5" onClick={openDeleteModal}>Delete</Button>
                            </div>
                        )
                    })}
                </ScrollableDiv>
            }
            {joinedTeams.length > 0 &&
                <ScrollableDiv title="Joined teams">
                    {joinedTeams.map((team) => {
                        return (
                            <div onClick={() => { handleSelectTeam(team) }} className="cursor-pointer mb-3 h-auto w-full px-5 py-6 bg-Mine_Shaft_900 rounded justify-between items-center inline-flex 
            transition-all duration-300 ease-in-out transform hover:scale-95 hover:shadow-xl">
                                <div className="text-Mine_Shaft_300 text-lg font-normal font-sfText leading-tight">{team.name}</div>
                            </div>
                        )
                    })}
                </ScrollableDiv>
            }
            {openDeleteTeamModal && <Alert title="Delete Team" ButtonTitle="Delete" handleCancel={() => { setOpenDeleteTeamModal(false) }}
                handleProceed={handleDeleteTeam}>
                <div className="self-stretch text-center font-sfText font-normal">
                    <div>Are you sure you want to delete this team?</div>
                    <div>This action cannot be undone</div>
                </div>
            </Alert>
            }
        </div >
    )
}

export default UserTeams;