// auth of booking middleware


import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UsersModel } from './modules/usersmodules/user.model';

interface JwtPayloadWithId extends JwtPayload {
    _id: string;
}
const authBookingMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayloadWithId;
        if (!decoded._id) {
            return res.status(401).json({ success: false, message: 'Invalid token.' });
        }
        const user = await UsersModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid token.' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid token.' });
    }
};

export default authBookingMiddleware;
