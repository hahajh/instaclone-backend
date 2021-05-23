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
    }
`