import db from "../../db"

export async function getUrl() {
    try {
        return await db.url.findMany();
    } catch (e) {
        console.log(`${e}`)
    }
}

// @ts-ignore
export async function createUrl(options: {longUrl: string}, jwt, set, auth) {
    try {
        const profile = await jwt.verify(auth)
        if (!profile) {
            set.status = 401
            return 'Unauthorized'
        }
        const {longUrl} = options;
        const res = await db.url.create({
            data: {
                longUrl,
                userId: profile.id,
            }
        })
        const {shortUrl} = res;
        return Response.json({ status: 'success', shortUrl});
    } catch (e) {
        console.log(`Error creating url : ${e}`)
    }
}