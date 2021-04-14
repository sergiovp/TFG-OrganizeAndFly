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

router.post('/login', async function (req: express.Request, res: express.Response): Promise<any> {
    const { email, pass } = req.body;

    const response = await userController.logIn(email, pass);

    res.status(response.status || status.Success).send(response.msg || response.token);
});

export default router;
