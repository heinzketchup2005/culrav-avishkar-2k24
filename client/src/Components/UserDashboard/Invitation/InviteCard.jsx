import { Button } from "@/ShadCnComponents/ui/button";

function InvitationCard({ invite }) {
    return (<div className="bg-dark_secondary rounded-lg  sm:w-[80%]  md:w-[60%] lg:w-[50%] flex sm:justify-between sm:items-center  flex-col sm:flex-row p-2">
        <div className="sm:text-Mine_Shaft_300 text-floral_white p-2 sm:mb-0 mb-4 sm:p-0 text-xl sm:text-lg font-medium  font-sfText leading-tight ">{invite.teamName}</div>
        <div className="sm:flex flex-row hidden sm:justify-between mb-2 gap-8 sm:gap-5 sm:mb-0">
            <Button className="px-10 text-base text-flamingo_50 bg-customGreen hover:bg-green-900  font-medium font-sfText leading-tight">Accept</Button>
            <Button className="px-10 text-base text-flamingo_50 bg-customRed hover:bg-red-800  font-medium font-sfText leading-tight">Reject</Button>
        </div>
        <div className="flex flex-row-reverse sm:hidden sm:justify-between mb-1 gap-8 sm:gap-5 sm:mb-0">
            <Button className="px-10 text-base text-flamingo_50 bg-customRed hover:bg-red-800  font-medium font-sfText leading-tight">Reject</Button>
            <Button className="px-10 text-base text-flamingo_50 bg-customGreen hover:bg-green-900  font-medium font-sfText leading-tight">Accept</Button>
        </div>
    </div>)
}

export default InvitationCard;