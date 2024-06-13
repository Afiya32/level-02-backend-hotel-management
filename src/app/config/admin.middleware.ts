import { Request, Response, NextFunction } from 'express';


interface User {
    _id:string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: string;
}

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    
    const user = req.user as User | undefined;

    
    if (!user || user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
    }
    next();
};

export default adminMiddleware;