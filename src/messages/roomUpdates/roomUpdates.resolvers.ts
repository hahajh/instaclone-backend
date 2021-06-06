import { withFilter } from "graphql-subscriptions";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Context } from "../../types";
import { checkUserInRoom } from "./roomUpdate.utils";

const resolver = {
    Subscription: {
        roomUpdates: {
            subscribe: async (
                root: any,
                args: { id: number; },
                context: Context,
                info: any) => {
                // const room = await context.client.room.findFirst({
                //     where: {
                //         id: args.id,
                //         users: {
                //             some: {
                //                 id: context.loggedInUser.id
                //             }
                //         }
                //     }, select: {
                //         id: true
                //     }
                // });
                // if (!room) {
                //     return new Error("yoh shall not see this.");
                // }
                if (!checkUserInRoom(args.id, context.loggedInUser.id)) {
                    return new Error("yoh shall not see this.");
                }

                return withFilter(
                    () => pubsub.asyncIterator(NEW_MESSAGE),
                    ({ roomUpdates }, { id }, { loggedInUser }) => {
                        if (roomUpdates.roomId === id) {
                            return checkUserInRoom(id, loggedInUser.id);
                        }
                        return false;
                    }
                )(root, args, context, info);
            }
        }
    }
}

export default resolver;