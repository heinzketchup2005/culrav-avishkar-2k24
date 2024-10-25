import express from "express";
import {
    getallFeePaid,
    getallFeeNotPaid,
    getallTeamEvents,
    downloadAllEventTeamMembers,
    downloadAllEventTeamMembersEventId,
    downloadAcceptedTeamMembers,
    downloadAcceptedTeamMembersEventId,
    makedepartmentcoordinator,getalldepartmentcoordinators,getdepartmentcoordinatorsByDep,deletedepartmentcoordinators,verifypayment
} from "../Controllers/admin.controller.js";
import {AuthenticateToken,isAdmin,isDepartmentCoordinator,isFestivalSecretary} from '../Middlewares/auth.middleware.js'

const router = express.Router();
router.get("/getallFeePaid",isAdmin,getallFeePaid);
router.get("/getallFeeNotPaid",isAdmin,getallFeeNotPaid);
router.use("/getallTeamEvents/:eventId",isAdmin,getallTeamEvents);
router.use(
    "/downloadAllEventTeamMembers/:eventId",
    isAdmin,
    downloadAllEventTeamMembersEventId
);
router.use("/downloadAllEventTeamMembers",isFestivalSecretary,downloadAllEventTeamMembers);
router.use(
    "/downloadAcceptedTeamMembers/:eventId",isAdmin,
    downloadAcceptedTeamMembersEventId
);
router.use("/downloadAcceptedTeamMembers", downloadAcceptedTeamMembers);
router.post('/makedc',makedepartmentcoordinator);
router.get('/getalldcs',getalldepartmentcoordinators);
router.get('/getdcsBydep',getdepartmentcoordinatorsByDep);
router.post('/deletedcs',deletedepartmentcoordinators);
router.post('/verifypayment',verifypayment);

export default router;