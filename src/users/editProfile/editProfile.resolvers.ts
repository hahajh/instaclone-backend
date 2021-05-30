import * as bcrypt from "bcrypt";
import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";
import { uploadToS3 } from "../../shared/shared.utils";

const resolver: Resolvers = {
    Mutation: {
        editProfile: protectResolver(
            async (
                _,
                { firstName, lastName, username, email, password: newPassword, bio, avartar },
                { loggedInUser, client }
            ) => {
                try {
                    let avartarUrl = null;
                    if (avartar) {
                        avartarUrl = await uploadToS3(avartar, loggedInUser.id, "avartars");
                    }
                    let uglyPassword = null;
                    if (newPassword) {
                        uglyPassword = await bcrypt.hash(newPassword, 10);
                    }
                    const updatedUser = await client.user.update({
                        where: {
                            id: loggedInUser.id
                        },
                        data: {
                            firstName,
                            lastName,
                            username,
                            email,
                            bio,
                            ...(avartarUrl && { avartar: avartarUrl }),
                            ...(uglyPassword && { password: uglyPassword })
                        }
                    })
                    if (updatedUser.id) {
                        return {
                            ok: true
                        }
                    } else {
                        return {
                            ok: false,
                            error: "Can't update user info"
                        }
                    }
                } catch (e) {
                    return e;
                }
            }
        )
    }
}

export default resolver;