import { User } from "@prisma/client";
import client from "../client";
import { Context } from "../types";

export default {
    User: {
        totalFollowing: ({ id }) =>
            client.user.count({
                where: {
                    followers: {
                        some: {
                            id
                        }
                    }
                }
            }),
        totalFollowers: ({ id }) =>
            client.user.count({
                where: {
                    following: {
                        some: {
                            id
                        }
                    }
                }
            }),
        isMe: ({ id }: User, _: any, { loggedInUser }: Context) => {
            if (!loggedInUser) {
                return false;
            }
            return id === loggedInUser.id;
        },
        isFollowing: async ({ id }: User, _: any, { loggedInUser }: Context) => {
            if (!loggedInUser) {
                return false;
            }
            // const exists = await client.user
            //     .findUnique({ where: { username: loggedInUser.username } })
            //     .following({
            //         where: {
            //             id
            //         }
            //     })
            const exists = await client.user.count({
                where: {
                    username: loggedInUser.username,
                    following: {
                        some: {
                            id
                        }
                    }
                }
            })
            return Boolean(exists);
        },
        photos: ({ id }) => client.user.findUnique({ where: { id } }).photos,
    }
}