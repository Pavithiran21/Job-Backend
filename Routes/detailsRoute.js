import express from "express";
import { AdminDashboard, AllPortfolio, CheckPortfolio, CreatePortfolio, DeletePortfolio, MyPortfolio, UpdatePortfolio, searchPortfolio} from "../Controller/detailsController.js";
import { Admin, Authenticate } from "../Middlewares/Authenticate.js";
const router = express.Router();


router.post('/add-profile',Authenticate,CreatePortfolio);
router.put('/edit-profile/:id',Authenticate,UpdatePortfolio);
router.delete('/delete-profile/:id',Authenticate,DeletePortfolio);
router.get('/view-profile/:id',Authenticate,MyPortfolio);
router.get('/all-profile/',Authenticate,Admin,AllPortfolio)
router.get('/search-profile',Authenticate,Admin,searchPortfolio);
router.get('/admin-dashboard/',Authenticate,Admin,AdminDashboard);
router.get('/check-profile/:userId',Authenticate,CheckPortfolio);




export default router


