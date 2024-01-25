import {Elysia} from "elysia";
import userRoutes from "./routes/users";
import urlRoutes from "./routes/urls";
import swagger from "@elysiajs/swagger";
import cors from "@elysiajs/cors";
import RedirectUser from "./redirectUser";

const app = new Elysia()

app
    .use(swagger())
    .group('/api', (app) => app.use(userRoutes))
    .group('/api', (app) => app.use(urlRoutes))
    .get('/:key',({params: {key}}) => RedirectUser(key))
    .use(cors({
        credentials: true
    }))
    .listen(process.env.PORT || 3049)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
