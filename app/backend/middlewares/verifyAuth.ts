import express from 'express';
import jwt from 'jsonwebtoken';
import { getTokenNotProvided, getTokenNotMatch } from '../helpers/errorsFunctions';

const SECRET = 'app_secret_key';

export default function verifyUserToken(req: express.Request, res: express.Response, next: Function) {
    const header = req.headers['authorization'];

    const token = header && header.split(' ')[1];

    if (!token) {
        res.status(getTokenNotProvided().status).send(getTokenNotProvided().msg);

    } else {
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                res.status(getTokenNotMatch().status).send(getTokenNotMatch().msg);
            }
            else {
                next();
            }
        });
    }
}
