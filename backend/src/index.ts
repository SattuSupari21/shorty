import { Elysia } from "elysia";
import urlRoutes from "./routes/urls";
import userRoutes from "./routes/users";
import swagger from "@elysiajs/swagger";

const app = new Elysia()

app
    .use(swagger())
    .group('/api', (app) => app.use(urlRoutes))
    .group('/api', (app) => app.use(userRoutes))
    .listen(process.env.PORT || 3049)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
