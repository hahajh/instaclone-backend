import { gql } from "apollo-server";

export default gql`
    type UnfollwUserResult {
        ok: Boolean!
        error: String 
    }
    type Mutation {
        unfollowUser(username:String!): UnfollwUserResult!
    }
`;