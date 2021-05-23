import { Resolvers } from "../../types";

const resolvers: Resolvers = {
    Query: {
        seeProfile: (_, { username }, { client }) =>
            client.user.findUnique({
                where: {
                    username
                },
                include: {
                    following: true,
                    followers: false,
                }
            })
    }
}

export default resolvers;