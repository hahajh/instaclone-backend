import client from "../../client";

export const checkUserInRoom = async (roomId: number, userId: number) => {
    const room = await client.room.findFirst({
        where: {
            id: roomId,
            users: {
                some: {
                    id: userId
                }
            }
        }, select: {
            id: true
        }
    });
    if (!room) {
        return false;
    }

    return true;
}