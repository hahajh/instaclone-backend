import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolver: Resolvers = {
    Query: {
        seeRoom: protectResolver(
            async (_, { id }, { loggedInUser, client }) =>
                client.room.findFirst({
                    where: {
                        id,
                        users: {
                            some: {
                                id: loggedInUser.id
                            }
                        }
                    }
                })
        )
    }
}

export default resolver;