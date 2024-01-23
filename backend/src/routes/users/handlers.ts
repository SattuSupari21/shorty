import { Cookie } from "elysia";
import db from "../../db";

export async function getAllUsers() {
    try {
        return await db.user.findMany();
    } catch (e) {
        console.log(`${e}`)
    }
}

export async function getUser(options: { email: string, password: string }, jwt: {
    sign: (arg0: any) => any;
} | undefined, cookie: (Record<string, Cookie<any>> & Record<string, string>) | undefined, setCookie: ((arg0: string, arg1: any, arg2: { httpOnly: boolean; maxAge: number; }) => void) | undefined) {
    try {
        const { email, password } = options;
        const user = await db.user.findUnique({
            where: {
                email
            }
        })
        if (user) {
            const isPasswordMatch = await Bun.password.verify(password, user.password)
            if (isPasswordMatch) {
                if (setCookie) {
                    setCookie('auth', await jwt?.sign(user), {
                        httpOnly: false,
                        maxAge: 7 * 86400,
                    })
                }
                return `Sign in as ${cookie?.auth}`
            } else {
                return new Error("Invalid password")
            }
        } else {
            return new Error("No user found")
        }

    } catch (e) {
        console.log(`${e}`)
    }
}

export async function createUser(options: {name: string, email: string, password: string}) {
    try {
        const {name, email, password} = options;

        const bcryptHash = await Bun.password.hash(password, {
            algorithm: "bcrypt",
            cost: 4, // number between 4-31
        });

        return await db.user.create({
            data: {
                name,
                email,
                password: bcryptHash
            }
        })
    } catch (e) {
        console.log(`Error creating url : ${e}`)
    }
}