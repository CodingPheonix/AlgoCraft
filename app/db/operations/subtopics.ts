'use server'

import { Subtopic } from "../mongodb/mongo_schema"

export const addSubTopic = async (subTopic: SubTopic, tutorialId: string) => {
    try {
        // await db
        //     .insert(subtopicTable)
        //     .values({
        //         id: subTopic.id,
        //         name: subTopic.name,
        //         description: subTopic.description,
        //         difficulty: subTopic.difficulty,
        //         external_video: subTopic.external_video
        //     })

        await Subtopic.create({
            _id: subTopic.id,
            name: subTopic.name,
            description: subTopic.description,
            difficulty: subTopic.difficulty,
            external_video: subTopic.external_video,
            tutorialId
        })

    } catch (error) {
        console.error(error)
    }
}

export const editSubTopic = async (subTopic: SubTopic) => {
    try {
        // await db
        //     .update(subtopicTable)
        //     .set({
        //         name: subTopic.name,
        //         description: subTopic.description,
        //         difficulty: subTopic.difficulty,
        //         external_video: subTopic.external_video
        //     })
        //     .where(eq(subtopicTable.id, subTopic.id))

        await Subtopic.updateOne({ _id: subTopic.id }, {
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

export const remove_Subtopic = async (subtopicId: string) => {
    try {
        // await db
        //     .delete(subtopicTable)
        //     .where(eq(subtopicTable.id, subtopicId))

        await Subtopic.deleteOne({ _id: subtopicId })

        // await prisma.comments_table.deleteMany({
        //     where: {
                
        //     }
        // })

    } catch (error) {
        console.error(error)
    }
}