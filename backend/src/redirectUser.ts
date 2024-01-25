import db from "./db";

export default async function RedirectUser(key: string) {
    const url = await db.url.findFirst({
        where: {
            shortUrl: key
        },
        select: {
            longUrl: true
        }
    })
    if (url) return Response.redirect(url.longUrl)
    else return Response.redirect('http://localhost:3000')
}