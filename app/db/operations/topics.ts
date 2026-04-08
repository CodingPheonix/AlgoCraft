"use server"

import { Subtopic, Comments, Tutorials } from "../mongodb/mongo_schema"
import { Mixed } from "../../types"

export const insertTopic = async ({ id, title, content, subtopic_tableId }: { id: string, title?: string, content?: Mixed[], subtopic_tableId: string }) => {
    try {
        // await db
        //     .insert(topicstable)
        //     .values({
        //         id,
        //         title: title || 'Untitled',
        //         content: content || null,
        //         subtopic_tableId
        //     })

        await Subtopic.updateOne(
            { _id: subtopic_tableId },
            {
                $push: {
                    topics: {
                        _id: id,
                        title: title || 'Untitled',
                        content: content?.toString() || null
                    }
                }
            }
        )
    } catch (error) {
        console.error("Error inserting topic:", error);
        throw error;
    }
}

export const fetchTopics = async (id: string) => {
    try {
        // return await db
        //     .select()
        //     .from(topicstable)
        //     .where(eq(topicstable.id, id))

        const subtopic = await Subtopic.findOne({ _id: id }).lean()
        return subtopic?.topics

    } catch (error) {
        console.error("Error fetching topics:", error);
        throw error;
    }
}

export const editTopic = async (id: string, value: string) => {
    console.log("enter", id, value)
    try {
        // await db
        //     .update(topicstable)
        //     .set({
        //         title: value
        //     })
        //     .where(eq(topicstable.id, id))

        // Find subtopic containing this topic and update it
        await Subtopic.updateOne(
            { "topics._id": id },
            { $set: { "topics.$.title": value } }
        )
    } catch (error) {
        console.error(error)
    }
}

export const addTopicContent = async (subtopicId: string, title?: string | "untitled", content?: Mixed[] | []) => {
    try {
        // await db
        //     .update(topicstable)
        //     .set({
        //         title: title,
        //         content: content
        //     })
        //     .where(eq(topicstable.id, topicId))

        // Find subtopic and update the embedded topic with matching subtopicId
        await Subtopic.updateOne(
            { _id: subtopicId, "topics._id": { $exists: true } },
            { $set: { "topics.$.title": title, "topics.$.content": JSON.stringify(content) } }
        )
    } catch (error) {
        console.error("Error fetching topics:", error);
        throw error;
    }
}

export const deleteTopic = async (topicId: string) => {
    // const subtopics = await db
    //     .select({ subtopicId: tutorialSubtopicsTable.subtopicId })
    //     .from(tutorialSubtopicsTable)
    //     .where(eq(tutorialSubtopicsTable.tutorialId, topicId));
    // Delete tutorial and all its related data
    const subtopics = await Subtopic.find({ tutorialId: topicId }).lean()

    const subtopicIds = subtopics.map((s: any) => s._id)

    // Get all topic IDs from within subtopics for comment deletion
    const topicIds: string[] = []
    for (const subtopic of subtopics) {
        if (subtopic.topics && Array.isArray(subtopic.topics)) {
            topicIds.push(...subtopic.topics.map((t: any) => t._id))
        }
    }

    // Delete comments associated with these topics
    if (topicIds.length > 0) {
        await Comments.deleteMany({ topicId: { $in: topicIds } })
    }

    // Delete all subtopics (includes cascading delete of embedded algovisuals and topics)
    if (subtopicIds.length > 0) {
        await Subtopic.deleteMany({ _id: { $in: subtopicIds } })
    }

    // Delete the tutorial itself
    await Tutorials.deleteOne({ _id: topicId })
};