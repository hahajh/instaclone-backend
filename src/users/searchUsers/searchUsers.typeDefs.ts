import { gql } from "apollo-server-express";

export default gql`
    type SearchUsersResult {
        ok: Boolean!
        users: [User]
        error: String
    }
    type Query {
        searchUsers(keyword: String!, page: Int!): SearchUsersResult!
    }
`;