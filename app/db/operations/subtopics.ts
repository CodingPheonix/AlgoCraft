'use server'

import mongoose from "mongoose"
import { Comments, Subtopic, Tutorials } from "../mongodb/mongo_schema"
import { Mixed, SubTopic } from "@/app/types"

type AddSubTopicReturn = {
    id: string,
    name: string,
    description: string,
    difficulty: string,
    external_video: string,
    tutorialId: string
}

export const addSubTopic = async (subTopic: SubTopic, tutorialId: string): Promise<AddSubTopicReturn | undefined> => {
    try {
        const data = await Subtopic.create({
            name: subTopic.name,
            description: subTopic.description,
            difficulty: subTopic.difficulty,
            external_video: subTopic.external_video,
            tutorialId
        })

        return {
            id: data._id.toString() || "",
            name: data.name || "",
            description: data.description || "",
            difficulty: data.difficulty || "",
            external_video: data.external_video || "",
            tutorialId: data.tutorialId || ""
        }

    } catch (error) {
        console.error(error)
    }

    return;
}

export const insertTopic = async ({ tutorialId, subtopicId }: { tutorialId?: string, subtopicId?: string }) => {
    try {

        await Tutorials.findByIdAndUpdate(tutorialId, {
            $push: {
                subtopicIds: subtopicId
            }
        })
    } catch (error) {
        console.error("Error inserting topic:", error);
        throw error;
    }
}

export const editSubTopic = async (subTopic: SubTopic) => {
    try {
        await Subtopic.findByIdAndUpdate(subTopic.id, {
            $set: {
                name: subTopic.name,
                description: subTopic.description,
                difficulty: subTopic.difficulty,
                external_video: subTopic.external_video
            }
        })

    } catch (error) {
        console.error(error)
    }
}

export const remove_Subtopic = async (subtopicId: string, tutorialId: string) => {
    try {

        await Subtopic.findByIdAndDelete(subtopicId)

        await Tutorials.findByIdAndUpdate(tutorialId, {
            $pull: {
                subtopicIds: subtopicId
            }
        })

    } catch (error) {
        console.error(error)
    }
}



export const fetchTopics = async (id: string) => {
    try {
        const subtopic = await Subtopic.findById(id).lean()
        return subtopic?.topics

    } catch (error) {
        console.error("Error fetching topics:", error);
        throw error;
    }
}

export const editTopic = async (id: string, value: string) => {
    console.log("enter", id, value)
    try {
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
    await Tutorials.findByIdAndDelete(topicId)
};