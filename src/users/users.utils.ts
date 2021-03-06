import * as jwt from "jsonwebtoken"
import client from "../client";
import { Context, Resolver } from "../types";

export const getUser = async (token: string) => {
    try {
        if (!token) {
            return null;
        }
        const verifiedToken: any = await jwt.verify(token, process.env.SECRET_KEY);
        const user = await client.user.findUnique({ where: { id: verifiedToken["id"] } });
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch {
        return null;
    }
}

export const protectResolver = (ourResolvers: Resolver) => (root: any, args: any, context: Context, info: any) => {
    if (!context.loggedInUser) {
        const query = info.operation.operation === 'query';
        if (query) {
            return null;
        } else {
            return {
                ok: false,
                error: "You need to login"
            }
        }
    }
    return ourResolvers(root, args, context, info);
}