import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolver: Resolvers = {
    Mutation: {
        createComment: protectResolver(
            async (_, { photoId, payload }, { loggedInUser, client }) => {
                const photo = await client.photo.findUnique({
                    where: {
                        id: photoId
                    },
                    select: {
                        id: true
                    }
                })
                if (!photo) {
                    return {
                        ok: false,
                        error: "Photo not found."
                    }
                }
                await client.comment.create({
                    data: {
                        photo: {
                            connect: {
                                id: photoId
                            }
                        },
                        user: {
                            connect: {
                                id: loggedInUser.id
                            }
                        },
                        payload
                    }
                })

                return {
                    ok: true
                }
            }
        )
    }
}

export default resolver;