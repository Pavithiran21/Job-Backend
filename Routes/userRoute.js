import express from 'express';
import { activeAccount, forgot, login, register, reset, viewUser} from '../Controller/userController.js';
import { Authenticate } from '../Middlewares/Authenticate.js';
const router = express.Router();

router.post('/register',register);
router.get('/activate/:activeToken',activeAccount);
router.post('/reset',forgot);
router.put('/reset/:resetToken',reset);
router.post('/login',login);
router.get('/user-details/:id',Authenticate,viewUser);


export default router;
