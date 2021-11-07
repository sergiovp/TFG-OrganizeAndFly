import express from 'express';
import * as userController from '../user/userController';
import * as sessionController from '../session/sessionController';
import * as teamController from '../team/teamController';
import * as boardController from '../board/boardController';
import * as listController from '../list/listController';
import * as taskController from '../task/taskController';
import status from '../helpers/statusCodes';
import { verifyUserToken, verifyUser } from '../middlewares/verifyAuth';

const router: express.Router = express.Router();

declare module 'express-session' {
    interface Session {
        userToken: string;
    }
}

/************************
 * Session's routes:
 ***********************/

router.get('/logout', verifyUser, async function (req: express.Request, res: express.Response) {
    const response = await sessionController.deleteSession(req.session.id);

    req.session.destroy((err) => {});

    res.cookie('connect.sid', '', {expires: new Date(1), path: '/' });

    res.status(response.status).send(response.msg);
});

/************************
 * User's routes:
 ***********************/

router.post('/signup', async function (req: express.Request, res: express.Response): Promise<any> {
    const { email, pass, passConfirmation } = req.body;

    const response = await userController.signUp(email, pass, passConfirmation);

    response.msg ? '' : req.session.userToken = response.token;

    res.status(response.status || status.Created).send(response.msg || response.token);
});

router.post('/login', async function (req: express.Request, res: express.Response): Promise<any> {
    const { email, pass } = req.body;

    const response = await userController.logIn(email, pass);

    response.msg ? '' : req.session.userToken = response.token;

    res.status(response.status || status.Success).send(response.msg || response.token);
});

router.put('/profile/:userID', verifyUser, verifyUserToken, async function (req: express.Request, res: express.Response): Promise<any> {
    const userID = req.params.userID;
    const { email, actualPass, newPass, newPassRep } = req.body;

    const response = await userController.setProfile(userID, email, actualPass, newPass, newPassRep);

    response.msg.error ? '' : req.session.userToken = response.token;

    res.status(response.status || status.Success).send(response);
});

router.delete('/profile/:userID', verifyUser, verifyUserToken, async function (req: express.Request, res: express.Response): Promise<any> {
    const userID = req.params.userID;

    const response = await userController.deleteProfile(userID);

    res.status(response.status || status.Success).send(response.msg);
});

router.get('/profile/:userID', verifyUserToken, async function (req: express.Request, res: express.Response): Promise<any> {
    const userID = req.params.userID;

    const response = await userController.getProfile(userID);

    res.status(response.status || status.Success).send(response.msg || response);
});

router.get('/user/:userEmail', verifyUserToken, async function (req: express.Request, res: express.Response): Promise<any> {
    const userEmail = req.params.userEmail;

    const response = await userController.getUserEmail(userEmail);

    res.status(response.status || status.Success).send(response);
});

/************************
 * Team's routes:
 ***********************/

router.post('/team',
    verifyUser,
    verifyUserToken,
    async function (req: express.Request, res: express.Response): Promise<any> {
        const { teamName, teamDescription, userID } = req.body;

        const response = await teamController.addTeam(teamName, teamDescription, userID);

        res.status(status.Success).send(response);
});

router.get('/teams/:userID',
    verifyUser,
    verifyUserToken,
    async function (req: express.Request, res: express.Response): Promise<any> {
        const userID = req.params.userID;

        const response = await teamController.getUserTeams(userID);

        res.status(status.Success).send(response);
});

router.get('/team/:teamID',
    verifyUser,
    verifyUserToken,
    async function (req: express.Request, res: express.Response): Promise<any> {
        const teamID = req.params.teamID;

        const response = await teamController.getTeam(teamID);

        res.status(status.Success).send(response);
});

/************************
 * Board's routes:
 ***********************/

router.post('/board',
    verifyUser,
    verifyUserToken,
    async function (req: express.Request, res: express.Response): Promise<any> {
        const { boardName, boardDescription, userID } = req.body;

        const response = await boardController.addBoard(boardName, boardDescription, userID);

        res.status(status.Success).send(response);
});

router.get('/boards/:userID',
    verifyUser,
    verifyUserToken,
    async function (req: express.Request, res: express.Response): Promise<any> {
        const userID = req.params.userID;

        const response = await boardController.getUserBoards(userID);

        res.status(status.Success).send(response);
});

router.get('/board/:boardID',
    verifyUser,
    verifyUserToken,
    async function (req: express.Request, res: express.Response): Promise<any> {
        const boardID = req.params.boardID;

        const response = await boardController.getBoard(boardID);

        res.status(status.Success).send(response);
});

export default router;
