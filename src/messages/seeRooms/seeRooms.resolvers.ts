import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolver: Resolvers = {
    Query: {
        seeRooms: protectResolver(
            async (_, { }, { loggedInUser, client }) => client.room.findMany({
                where: {
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