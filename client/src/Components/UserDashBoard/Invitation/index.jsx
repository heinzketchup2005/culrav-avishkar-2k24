import InvitationCard from "@/Components/UserDashboard/Invitation/InviteCard"
import ScrollableDiv from "@/Components/UserDashboard/shared/ScrollableDiv"
import ContentBox from "@/assets/userDashBoard/ContentBox.png"

function Invitations() {
    const invites = [{ teamName: "Trycatch-0" }, {
        teamName: "Trycatch-1"
    },
    { teamName: "Trycatch-2" },
    { teamName: "Trycaatch-3" },
    { teamName: "Trycaatch-3" },
    { teamName: "Trycaatch-3" },
    { teamName: "Trycaatch-3" },
    ]


    return (
        <div className="overflow-y-scroll md:w-[74vw] bg-white custom1000:w-[80vw] custom1840:w-[83vw] w-full absolute top-[92px] flex pt-20 p-5 md:p-10  h-full md:h-auto
            
                "
            style={{
                height: 'calc(100vh - 92px)',
                backgroundImage: `url(${ContentBox})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}>

            {invites.length > 0 ? <div className=" w-full flex gap-4  text-xl flex-col 
            ">
                <div className="font-sfText leading-tight text-2xl mb-5 font-bold">Recieved Invitations</div>
                <div className="overflow-y-scroll flex flex-col gap-5 
                 [&::-webkit-scrollbar]:w-1
                [&::-webkit-scrollbar-thumb]:rounded-full 
                [&::-webkit-scrollbar-thumb]:bg-dark_secondary
                max-h-[600px] md:max-h-[450px]">
                    {invites.map((invite) => {
                        return (
                            <InvitationCard invite={invite} />
                        )
                    })}
                </div>
            </div> :
                <div className="w-full h-full text-center font-normal font-sfText leading-tight text-lg">
                    No Invitation
                </div>}

        </div>

    )
}

export default Invitations