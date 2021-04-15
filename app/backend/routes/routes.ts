/**
 * API routes file
 */

import express from 'express';
import * as userController from '../user/userController';
import * as userModel from '../user/userModel';
import status from '../helpers/statusCodes'; 

const router: express.Router = express.Router();

/************************
 * User's routes:
 ***********************/

router.post('/signup', async function (req: express.Request, res: express.Response): Promise<any> {
    const { email, pass, passConfirmation } = req.body;

    const response = await userController.signUp(email, pass, passConfirmation);

    res.status(response.status || status.Created).send(response.msg || response.token);
});

router.post('/login', async function (req: express.Request, res: express.Response): Promise<any> {
    const { email, pass } = req.body;

    const response = await userController.logIn(email, pass);

    res.status(response.status || status.Success).send(response.msg || response.token);
});

router.get('/profile/:userID', async function (req: express.Request, res: express.Response): Promise<any> {
    const userID = req.params.userID;

    const response = await userController.getProfile(userID);

    res.status(response.status || status.Success).send(response.msg);

});

export default router;
