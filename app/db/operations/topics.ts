"use server"

import { Algovisuals, Comments, Subtopic, Topics, Tutorials } from "../mongodb/mongo_schema"
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

        await Topics.create({
            _id: id,
            title: title || 'Untitled',
            content: content?.toString() || null,
            subtopicId: subtopic_tableId
        })
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

        return await Topics.findOne({ subtopicId: id }).lean()

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

        await Topics.updateOne({ _id: id }, { $set: { title: value } })
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

        await Topics.updateOne({ subtopicId }, { $set: { title: title, content: JSON.stringify(content) } })
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
    const subtopics = await Subtopic.find({ tutorialId: topicId }).lean()

    const subtopicIds = subtopics.map((s: any) => s.id)

    if (subtopicIds.length > 0) {
        await Algovisuals.deleteMany({ subtopicId: { $in: subtopicIds } })
    }

    if (subtopicIds.length > 0) {
        await Subtopic.deleteMany({ _id: { $in: subtopicIds } })
    }

    const topics = await Topics.find({ subtopicId: { $in: subtopicIds } }).lean()

    const topicIds = topics.map((t: any) => t.id)

    if (topicIds.length > 0) {
        await Comments.deleteMany({ topicId: { $in: topicIds } })
    }

    await Topics.deleteMany({ subtopicId: { $in: subtopicIds } })

    await Tutorials.deleteOne({ _id: topicId })
};