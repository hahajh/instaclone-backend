import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolver: Resolvers = {
    Query: {
        seeFeed: protectResolver((_, { }, { loggedInUser, client }) =>
            client.photo.findMany({
                where: {
                    OR: [
                        {
                            user: {
                                followers: {
                                    some: {
                                        id: loggedInUser.id
                                    }
                                }
                            }
                        },
                        {
                            userId: loggedInUser.id
                        }
                    ]
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
        )
    }
}

export default resolver;