import express from 'express';
const router=express.Router();
import {makedc,getalldcs,getdcsByDep,deletedcs,verifypayment} from '../Controllers/admin.controller.js';

router.post('/makedc',makedc);
router.get('/getalldcs',getalldcs);
router.get('/getdcsBydep',getdcsByDep);
router.post('/deletedcs',deletedcs);
router.post('/verifypayment',verifypayment);

export default router;