import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolver: Resolvers = {
    Query: {
        seePhoto: (_, { id }, { client }) => client.photo.findUnique({
            where: { id }
        })
    }
}

export default resolver;