import express, { NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { getTokenNotProvided, getTokenNotMatch, getNoSession } from '../helpers/errorsFunctions';

// Configure DOTENV to use ENV variables.
dotenv.config();

const SECRET = process.env.JWT_SECRET || '';

/**
 * Verify if the user token is valid and match.
 */
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
                if (req.session.userToken === token) {
                    return next();
                } else {
                    res.status(getTokenNotMatch().status).send(getTokenNotMatch().msg);
                }
            }
        });
    }
}

/**
 * Verify if user session exists.
 */
export function verifyUser(req: express.Request, res: express.Response, next: NextFunction) {
    if (req.session && req.session.userToken) {
        return next();
    }
    const err = getNoSession();

    return res.status(err.status).send(err.msg);
}
