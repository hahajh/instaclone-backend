export const processHashtags = (caption: string) => {
    const hashtags = caption.match(/#[\w]+/g) || [];
    console.log(hashtags);
    return hashtags.map((hashtag: string) => ({
        where: { hashtag },
        create: { hashtag }
    }));
}