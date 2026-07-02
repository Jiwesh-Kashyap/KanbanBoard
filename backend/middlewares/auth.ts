import type { Request, Response, NextFunction } from "express";
import { validateToken } from "../services/authn.js";

export function requireAuth(req: Request, res: Response, next: NextFunction){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ message: "Unauthorized - Please sign in first" });
    }

    try{
        const payload = validateToken(token);
        res.locals.userId = payload.id;

        next();
    } catch(error){
        return res.status(401).json({message: "Unauthorized - Invalid token"});
    }
}