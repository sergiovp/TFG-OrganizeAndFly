import express, { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getTokenNotProvided, getTokenNotMatch, getNoSession } from '../helpers/errorsFunctions';

const SECRET = 'app_secret_key';

export function verifyUserToken(req: express.Request, res: express.Response, next: NextFunction) {
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

export function verifyUser(req: express.Request, res: express.Response, next: NextFunction) {
    if (req.session && req.session.userToken) {
        return next();
    }
    const err = getNoSession();

    return res.status(err.status).send(err.error);
}
