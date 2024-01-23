import db from "../../db"

export async function getUrl() {
    try {
        return await db.url.findMany();
    } catch (e) {
        console.log(`${e}`)
    }
}

export async function createUrl(options: {longUrl: string, userId: number}) {
    try {
         const {longUrl, userId} = options;
         return await db.url.create({
             data: {
                 shortUrl: "",
                 longUrl,
                 userId
             }
         })
    } catch (e) {
        console.log(`Error creating url : ${e}`)
    }
}