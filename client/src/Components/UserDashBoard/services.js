import Axios from "./axiosService"

const createTeam = async({leader, teamName, teamSize, token}) => {
    try{
        const response = await Axios.post(`/team/v1/createTeam`, 
            {leader, teamName, size : teamSize},
            {headers:{Authorization: `Bearer ${token}`}}
        )
        
        if(response?.data?.ok){
            console.log(response?.data?.msg)
            return response?.data?.ok
        }else{
            console.log(response?.data?.msg)
            return false
        }
    }catch(err){
        console.log(err)
        return false
    }
}

const getInvitations = async({userId, token}) => {
    try{
        const response = await Axios.get(`/team/v1/getAllInvites/${userId}`,
            {headers:{Authorization: `Bearer ${token}`}}
        )

        if(response?.data?.ok){
            console.log(response?.data?.msg);
            return response?.data
        }else{
            console.log(response?.data?.msg)
            return null
        }
    }catch(err){
        console.log(err)
        return false
    }
}

const getAllTeams = async({userId, token}) => {
    try{
        const response = await Axios.get(`/team/v1/participatingTeamsOfAUser/${userId}`,
            {headers:{Authorization: `Bearer ${token}`}}
        )

        if(response?.data?.ok){
            console.log(response?.data?.msg);
            return response?.data
        }else{
            console.log(response?.data?.msg)
            return null
        }
    }catch(err){
        console.log(err)
        return null
    }

}

const splitTeamsByLeader = ({totalTeams, givenLeaderId}) => {
    const matchingLeaderTeams = totalTeams.filter(team => team.leader === givenLeaderId);

    const nonMatchingLeaderTeams = totalTeams.filter(team => team.leader !== givenLeaderId);

    return {
        matchingLeaderTeams,
        nonMatchingLeaderTeams
    };
}

const updateResume = async({email, resumeLink, token}) => {
    try{
        const response = await Axios.post(`/team/v1/updateResume`,
            {email, resumeLink},
            {headers:{Authorization: `Bearer ${token}`}}
        )

        if(response?.data?.ok){
            console.log(response?.data?.msg);
            return response?.data
        }else{
            console.log(response?.data?.msg)
            return null
        }
    }catch(err){
        console.log(err)
        return null
    }
}

export {createTeam, getInvitations, getAllTeams, splitTeamsByLeader, updateResume}