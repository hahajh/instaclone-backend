import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolver: Resolvers = {
    Query: {
        seePhotoComments: (_, { id }, { client }) =>
            client.comment.findMany({
                where: {
                    photoId: id
                },
                orderBy: {
                    createdAt: "asc"
                }
            })
    }
}

export default resolver;