import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

const resolver: Resolvers = {
    Mutation: {
        uploadPhoto: protectResolver(
            async (_, { file, caption }, { loggedInUser, client }) => {
                let hashtagObj = [];
                if (caption) {
                    hashtagObj = processHashtags(caption);
                }
                return client.photo.create({
                    data: {
                        file,
                        caption,
                        user: {
                            connect: {
                                id: loggedInUser.id
                            }
                        },
                        ...(hashtagObj.length > 0 && {
                            hashtags: {
                                connectOrCreate: hashtagObj
                            }
                        })
                    }
                })
            }
        )
    }
};

export default resolver;