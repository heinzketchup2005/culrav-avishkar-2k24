import InvitationCard from "@/Components/UserDashboard/Invitation/InviteCard"
import ScrollableDiv from "@/Components/UserDashboard/ScrollableDiv"
import overlay1 from "@/assets/Overlay1.png"

function Invitations() {
    const invites = [{ teamName: "Trycatch-0" }, {
        teamName: "Trycatch-1"
    },
    { teamName: "Trycatch-2" },
    { teamName: "Trycaatch-3" }]


    return (
        <div className="p-3 sm:px-10 sm:py-10 w-full bg-floralWhite"
            style={{
                backgroundImage: `url(${overlay1})`,
                backgroundSize: 'cover', // Ensure image covers the entire div
                backgroundPosition: 'center', // Center the image
                backgroundRepeat: 'no-repeat', // Prevent image repetition
                width: '100%', // Set the width to 100% of the parent
                height: '100%' // Set the height of the div
            }}>

            {invites.length > 0 ? <div className="flex gap-4  text-xl flex-col text-customOrange">
                <div className="font-medium font-sfText leading-tight text-xl mb-5">Recieved Invitations</div>
                {invites.map((invite) => {
                    return (
                        <InvitationCard invite={invite} />
                    )
                })}
            </div> :
                <div className="w-full h-full text-center font-normal font-sfText leading-tight text-lg">
                    No Invitation
                </div>}

        </div>

    )
}

export default Invitations