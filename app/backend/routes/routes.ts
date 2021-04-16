import express from 'express';
import * as userController from '../user/userController';
import status from '../helpers/statusCodes';
import verifyUserToken from '../middlewares/verifyAuth';

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

router.put('/profile/:userID', verifyUserToken, async function (req: express.Request, res: express.Response): Promise<any> {
    const userID = req.params.userID;
    const { email, actualPass, newPass } = req.body;

    const response = await userController.setProfile(userID, email, actualPass, newPass);

    res.status(response.status || status.Success).send(response.msg);
});

router.delete('/profile/:userID', verifyUserToken, async function (req: express.Request, res: express.Response): Promise<any> {
    const userID = req.params.userID;

    const response = await userController.deleteProfile(userID);

    res.status(response.status || status.Success).send(response.msg);
});

router.get('/profile/:userID', verifyUserToken, async function (req: express.Request, res: express.Response): Promise<any> {
    const userID = req.params.userID;

    const response = await userController.getProfile(userID);

    res.status(response.status || status.Success).send(response.msg || response);
});

export default router;
