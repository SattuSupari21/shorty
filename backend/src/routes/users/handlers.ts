import db from "../../db";

export async function getAllUsers() {
    try {
        return await db.user.findMany();
    } catch (e) {
        console.log(`${e}`)
    }
}

export async function createUser(options: {name: string, email: string, password: string}) {
    try {
        const {name, email, password} = options;
        return await db.user.create({
            data: {
                name,
                email,
                password
            }
        })
    } catch (e) {
        console.log(`Error creating url : ${e}`)
    }
}