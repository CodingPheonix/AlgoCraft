'use server'

import { Comments } from "../mongodb/mongo_schema"

export const uploadComment = async ({ id, topic_id, username, message, time }: { id: string, topic_id: string, username: string, message: string, time: Date }) => {
    try {
        // await db
        // .insert(commentsTable)
        // .values({
        //     id,
        //     topic_id,
        //     username,
        //     message,
        //     time
        // })

        await Comments.create({
            _id: id,
            topicId: topic_id,
            username,
            message,
            time
        })
    } catch (error) {
        throw error;
    }
}

export const fetchComments = async (id: string) => {
    try {
        // return await db
        //     .select()
        //     .from(commentsTable)
        //     .where(eq(commentsTable.topic_id, id))

        return await Comments.find({ topicId: id }).lean()
    } catch (error) {
        throw error;
    }
}