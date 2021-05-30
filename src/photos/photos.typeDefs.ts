import { gql } from "apollo-server";

export default gql`
    type Photo {
        id: Int!
        user: User!
        file: String!
        caption: String
        comments: Int!
        hashtags: [Hashtag]
        likes: Int!
        isMine: Boolean!
        createdAt: String!
        updatedAt: String!
    }
    type Hashtag {
        id: Int!
        hashtag:  String!
        photos: [Photo]
        totalPhotos: Int!
        createdAt: String!
        updatedAt: String!
    }
`;