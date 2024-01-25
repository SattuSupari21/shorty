import db from "../../db"

function getShortUrl(url: string) {
    function extractDomain() {
        try {
            const parsedUrl = new URL(url);
            return parsedUrl.hostname;
        } catch (error) {
            console.error('Error parsing URL:', error);
            return null;
        }
    }
    function getSubstringAfterDomain(domain: string | null) {
        if (typeof domain === "string") {
            const domainIndex = url.indexOf(domain);
            if (domainIndex !== -1) {
                const startIndex = domainIndex + domain.length;
                return url.substring(startIndex);
            } else {
                return null;
            }
        }
    }
    const domain = extractDomain();
    const url_to_encode = getSubstringAfterDomain(domain)
    if (typeof url_to_encode === "string") {
        return btoa(url_to_encode).slice(0, 7);
    }
}

export async function getUrl() {
    try {
        return await db.url.findMany();
    } catch (e) {
        console.log(`${e}`)
    }
}

// @ts-ignore
export async function createUrl(options: {longUrl: string, key: string}, jwt, set, auth) {
    try {
        const profile = await jwt.verify(auth)
        if (!profile) {
            set.status = 401
            return Response.json({ status: 'Unauthorized'});
        }
        const {longUrl, key} = options;
        let shortUrl;
        if (key) {
            const res = await db.url.findFirst({
                where: {
                    shortUrl: key
                }
            })
            if (res)   return Response.json({status: 'failed', message: 'Key already exists! try a different one.'})
            shortUrl = key;
        } else {
            shortUrl = getShortUrl(longUrl);
        }
        const res = await db.url.create({
            data: {
                shortUrl,
                longUrl,
                userId: profile.id,
            }
        })
        return Response.json({ status: 'success', shortUrl: 'http://localhost:3049/' + shortUrl});
    } catch (e) {
        console.log(`Error creating url : ${e}`)
    }
}
