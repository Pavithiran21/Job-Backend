import express from "express";
import {  AddApplication, AllApplications, ApplicantDashboard, DeleteApplications, MyApplications, UpdateApplicationStatus, ViewApplications} from "../Controller/applicationController.js";
import { Admin, Authenticate } from "../Middlewares/Authenticate.js";
const router = express.Router();


router.post('/add-application',Authenticate,AddApplication);
router.get('/view-application/:id',Authenticate,ViewApplications);

router.get('/my-applications/:userId',Authenticate,MyApplications);
router.delete('/delete-application/:id',Authenticate,Admin,DeleteApplications);
router.get('/applicant-dashboard/:userId',Authenticate,ApplicantDashboard);


router.get('/admin/all-applications/',Authenticate,Admin,AllApplications);

router.put('/application-status/:id',Authenticate,Admin,UpdateApplicationStatus);




export default router
