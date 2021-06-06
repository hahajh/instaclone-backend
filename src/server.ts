require('dotenv').config();
import * as http from "http"
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import * as logger from "morgan";
import client from "./client";
import { resolvers, typeDefs } from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
    resolvers,
    typeDefs,
    context: async (ctx) => {
        if (ctx.req) {
            return {
                loggedInUser: await getUser(ctx.req.headers.token),
                client
            }
        } else {
            const {
                connection: { context },
            } = ctx;
            return {
                loggedInUser: context.loggedInUser,
                client
            }
        }
    },
    subscriptions: {
        onConnect: async function (params: any) {
            if (!params.token) {
                throw new Error("You can't listen");
            }
            return {
                loggedInUser: await getUser(params.token)
            };
        }
    }
});

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});