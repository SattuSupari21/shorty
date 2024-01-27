import { Cookie } from "elysia";
import db from "../../db";
import { JWTPayloadSpec } from "@elysiajs/jwt";

// @ts-ignore
export async function getUserData(jwt, auth) {
    try {
        const profile = await jwt.verify(auth)
        if (profile) return profile;
    } catch (e) {
        console.log(`${e}`)
    }
}

export async function getUser(options: { email: string, password: string }, jwt: {
    sign: (arg0: any) => any;
} | undefined, cookie: (Record<string, Cookie<any>> & Record<string, string>) | undefined, setCookie: ((arg0: string, arg1: any, arg2: {
    path: string;
    maxAge: number;
    httpOnly: boolean
}) => void) | undefined) {
    try {
        const {email, password} = options;
        const user = await db.user.findUnique({
            where: {
                email
            }
        })
        if (!user) return Response.json({status: 'error', error: 'Invalid email or password'})
        const isPasswordMatch = await Bun.password.verify(password, user.password)
        if (!isPasswordMatch) return Response.json({status: 'error', error: 'Invalid email or password'})
        if (setCookie) {
            setCookie('auth', await jwt?.sign({id: user.id, name: user.name, email: user.email}), {
                httpOnly: false,
                path: '/',
                maxAge: 7 * 86400,
            })
        }
        return Response.json({status: 'success', token: `${cookie?.auth}`, name: user.name, email: user.email})
    } catch (e) {
        console.log(`${e}`)
    }
}

export async function createUser(options: { name: string, email: string, password: string }, jwt: { sign: any; verify?: (jwt?: string | undefined) => Promise<false | (Record<string, string | number> & JWTPayloadSpec)>; }) {
    try {
        const {name, email, password} = options;
        const userExists = await db.user.findUnique({
            where: {
                email
            }
        })
        if (userExists)   return Response.json({status: 'error', error: ['Choose another email']})

        const bcryptHash = await Bun.password.hash(password, {
            algorithm: "bcrypt",
            cost: 4, // number between 4-31
        });

        const user = await db.user.create({
            data: {
                name,
                email,
                password: bcryptHash
            }
        })
        const token = await jwt?.sign({id: user.id, name: user.name, email: user.email})

        return Response.json({ status: 'success', token, name: user.name, email: user.email})
    } catch (e) {
        console.log(`Error creating url : ${e}`)
    }
}