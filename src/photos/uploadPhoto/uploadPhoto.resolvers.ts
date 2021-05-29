import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolver: Resolvers = {
    Mutation: {
        uploadPhoto: protectResolver(
            async (_, { file, caption }, { loggedInUser, client }) => {
                let hashtagObj = [];
                if (caption) {
                    const hashtags = caption.match(/#[\w]+/g);
                    hashtagObj = hashtags.map((hashtag: string) => ({
                        where: { hashtag },
                        create: { hashtag }
                    }));
                }
                console.log(loggedInUser.id);
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