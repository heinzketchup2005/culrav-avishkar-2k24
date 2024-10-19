import User from '../Models/user.model.js';
import Event from '../Models/event.model.js';
import Team from '../Models/team.model.js';
import { activationnotice } from '../helper/mailhandler.js';
const makedc = async (req, res, next) => {
    const { email, department } = req.body;

    if (!email) {
        return next(new Error('Email not found'));
    }
    if (!department) {
        return next(new Error('Department not found'));
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(new Error('User not found'));
        }
        if (user.role === 'dc') {
            return next(new Error('User is already a departmental coordinator'));
        }
        user.department = department;
        user.role = 'dc';
        await user.save();

        return res.status(200).json({ message: 'User role shifted to DC successfully', success: 'true' });
    } catch (err) {
        console.log(err);
        next(err);
    }
};


const getalldcs=async(req,res,next)=>{
    try{
        const user = await User.find({role:'dc'});
        if(user.length==0){
            res.status(400).json({message:'There are no departmental coordinators',success:'false'});
            return ;
        }
        res.status(200).json({data:user,success:'true'});
    }
    catch(err){
        console.log(err);
        next(err);
    }
}

const getdcsByDep = async (req,res,next) => {
    const { department } = req.body;
    if (!department) {
        return next(new Error('department is required'));
    }
    try {
        const dcs = await User.find({ role:'dc',department });
        if (dcs.length === 0) {
            return res.status(404).json({ message: 'No departmental coordinators found for this department', success: false });
        }
        res.status(200).json({data:dcs,success:true});
    } catch (err) {
        console.error(err);
        next(err);
    }
}

const deletedcs=async(req,res,next)=>{
    const {email} = req.body;
    if(!email){
        return next(new Error('Invalid email'));
    }
    try{
        const user = await User.findOne({email});
        if (!user) {
            return next(new Error('User not found'));
        }
        if(user.role!="dc"){
            return next(new Error('User is not a departmental coordinator'));
        }
        user.role='user';
        user.department=null;
        await user.save();
        res.status(200).json({data:'dc role removed',success:'true'});
    }
    catch(err){
        console.log(err);
        next(err);
    }
}


const verifypayment=async(req,res,next)=>{
    const {email,paymentstatus,userid} = req.body;
    if(!email){
        return next(new Error('Invalid email'));
    }
    if(paymentstatus==null){
        return next(new Error('status cannot be empty'));
    }
    if(!userid){
        return next(new Error('userid cannot be empty'));
    }
    try{
        const user = await User.findById(userid);
        if(!user){
            return next(new Error('user should exist'));
        }
        const verifyuser = await User.findOne({email});
        if(!verifyuser){
            return next(new Error('verifyuser should exist'));
        }
        if(user.role!="fs"){
            return next(new Error('only festival secretary can verify the payment status'));
        }
        if(paymentstatus){
            verifyuser.isFeePaid=true;
            await verifyuser.save();
            const mail = await activationnotice(email, 'Your Account Has Been Activated by Payment Verification');
            console.log("mail",mail);
            if (mail) {
                return res.status(200).json({ message: "User is verified", success: true });
            }
            return res.status(200).json({ message: "User is verified but unable to send the mail", success: true });
        }
    }
    catch(err){
        next(err);
    }
}

export {makedc,getalldcs,getdcsByDep,deletedcs,verifypayment};