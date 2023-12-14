import express from 'express';
const router = express.Router();
import { CreateJob, UpdateJob, DeleteJob, AllJob, ViewJob, searchJob} from '../Controller/jobController.js';
import { Admin, Authenticate } from '../Middlewares/Authenticate.js';



router.post('/admin/create-job',Authenticate,Admin,CreateJob);
router.put('/admin/edit-job/:id',Authenticate,Admin,UpdateJob);
router.delete('/admin/delete-job/:id',Authenticate,Admin,DeleteJob);
router.get('/view-job/:id',Authenticate,ViewJob);
router.get('/all-jobs',Authenticate,AllJob);
router.get('/search-job',Authenticate,searchJob);


export default router