import {Elysia, t} from "elysia";
import {createUrl, getUrl} from "./handlers";

const urlRoutes = new Elysia({prefix: '/url'})
    .get('/:shortUrl', () => getUrl())
    .post('/', ({ body }) => createUrl(body), {
        body: t.Object({
            longUrl: t.String(),
            userId: t.Number()
        })
    })

export default urlRoutes;