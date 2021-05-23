import { gql } from "apollo-server";

export default gql`
    type User {
        id: String!
        firstName: String!
        lastName: String
        username: String!
        email: String!
        bio: String
        avartar: String
        createdAt: String!
        updatedAt: String!
        followers: [User]
        following: [User]
        totalFollowing: Int!
        totalFollowers: Int!
        isMe: Boolean!
        isFollowing: Boolean!
    }
`;