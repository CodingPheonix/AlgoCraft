"use server"

import { Tutorials, Subtopic } from "../mongodb/mongo_schema"

export const insertTutorial = async ({ id, title, authorId, type }: { id?: string, title: string, authorId: string, type: "algorithm" | "data_structure" }) => {
    try {
        // await db
        //     .insert(tutorialsTable)
        //     .values({
        //         id,
        //         title,
        //         authorId,
        //         type
        //     })

        await Tutorials.create({
            title,
            authorId,
            type
        })
    } catch (error) {
        console.error("Error inserting tutorial:", error)
        throw error
    }
}

export const fetchTutorials = async (authorId: string) => {
    try {
        // return await db
        //     .select()
        //     .from(tutorialsTable)
        //     .where(eq(tutorialsTable.authorId, authorId))

        return await Tutorials.find({ authorId }).lean()
    } catch (error) {
        console.error("Error fetching tutorials:", error)
        throw error
    }
}

export const fetchTutorialsWithSubtopic = async (authorId: string) => {
    if (!authorId) return;
    try {
        // const rows = await db
        //     .select({
        //         tutorialId: tutorialsTable.id,
        //         tutorialTitle: tutorialsTable.title,
        //         tutorialType: tutorialsTable.type,
        //         subtopicId: subtopicTable.id,
        //         subtopicName: subtopicTable.name,
        //         subtopicDescription: subtopicTable.description,
        //         subtopicDifficulty: subtopicTable.difficulty,
        //         subtopicExternalVideo: subtopicTable.external_video
        //     })
        //     .from(tutorialsTable)
        //     .leftJoin(
        //         tutorialSubtopicsTable,
        //         eq(tutorialSubtopicsTable.tutorialId, tutorialsTable.id)
        //     )
        //     .leftJoin(
        //         subtopicTable,
        //         eq(subtopicTable.id, tutorialSubtopicsTable.subtopicId)
        //     )
        //     .where(eq(tutorialsTable.authorId, authorId));

        // const tutorialMap = new Map();

        // for (const row of rows) {
        //     if (!tutorialMap.has(row.tutorialId)) {
        //         tutorialMap.set(row.tutorialId, {
        //             id: row.tutorialId,
        //             title: row.tutorialTitle,
        //             type: row.tutorialType,
        //             subtopics: []
        //         });
        //     }

        //     if (row.subtopicId) {
        //         tutorialMap.get(row.tutorialId).subtopics.push({
        //             id: row.subtopicId,
        //             name: row.subtopicName,
        //             description: row.subtopicDescription,
        //             difficulty: row.subtopicDifficulty,
        //             external_video: row.subtopicExternalVideo
        //         });
        //     }
        // }

        // return Array.from(tutorialMap.values());

        if (!authorId) return [];

        const tutorials = await Tutorials.find({ authorId }).lean()

        return await Promise.all(
            tutorials.map(async (tutorial: any) => {
                const subtopics = await Subtopic.find({ tutorialId: tutorial.id }).lean()
                return {
                    id: tutorial.id,
                    title: tutorial.title,
                    type: tutorial.type,
                    subtopics: subtopics.map(sub => ({
                        id: sub.id,
                        name: sub.name,
                        description: sub.description,
                        difficulty: sub.difficulty,
                        external_video: sub.external_video
                    }))
                }
            })
        )
    } catch (error) {
        throw error;
    }
};


export const fetchAllTutorialsWithSubtopic = async () => {
    try {
        // const rows = await db
        //     .select({
        //         tutorialId: tutorialsTable.id,
        //         tutorialTitle: tutorialsTable.title,
        //         tutorialType: tutorialsTable.type,
        //         subtopicId: subtopicTable.id,
        //         subtopicName: subtopicTable.name,
        //         subtopicDescription: subtopicTable.description,
        //         subtopicDifficulty: subtopicTable.difficulty,
        //         subtopicExternalVideo: subtopicTable.external_video
        //     })
        //     .from(tutorialsTable)
        //     .leftJoin(
        //         tutorialSubtopicsTable,
        //         eq(tutorialSubtopicsTable.tutorialId, tutorialsTable.id)
        //     )
        //     .leftJoin(
        //         subtopicTable,
        //         eq(subtopicTable.id, tutorialSubtopicsTable.subtopicId)
        //     )

        // const tutorialMap = new Map();

        // for (const row of rows) {
        //     if (!tutorialMap.has(row.tutorialId)) {
        //         tutorialMap.set(row.tutorialId, {
        //             id: row.tutorialId,
        //             title: row.tutorialTitle,
        //             type: row.tutorialType,
        //             subtopics: []
        //         });
        //     }

        //     if (row.subtopicId) {
        //         tutorialMap.get(row.tutorialId).subtopics.push({
        //             id: row.subtopicId,
        //             name: row.subtopicName,
        //             description: row.subtopicDescription,
        //             difficulty: row.subtopicDifficulty,
        //             externalLink: row.subtopicExternalVideo
        //         });
        //     }
        // }

        // return Array.from(tutorialMap.values());

        const tutorials = await Tutorials.find().lean()

        return await Promise.all(
            tutorials.map(async (tutorial: any) => {
                const subtopics = await Subtopic.find({ tutorialId: tutorial.id }).lean()
                return {
                    id: tutorial.id,
                    title: tutorial.title,
                    type: tutorial.type,
                    subtopics: subtopics.map(sub => ({
                        id: sub.id,
                        name: sub.name,
                        description: sub.description,
                        difficulty: sub.difficulty,
                        external_video: sub.external_video
                    }))
                }
            })
        )
    } catch (error) {
        throw error;
    }
};

export const editTutorial = async (id: string, title: string) => {
    try {
        // await db
        //     .update(tutorialsTable)
        //     .set({ title })
        //     .where(eq(tutorialsTable.id, id));

        await Tutorials.updateOne({ _id: id }, { $set: { title } })
    } catch (error) {
        console.error("Error editing tutorial:", error);
        throw error;
    }
};

export const getTotalTutorialCount = async () => {
    try {
        // return await db
        //     .$count(tutorialsTable)

        return Tutorials.countDocuments()
    } catch (error) {
        console.error(error)
    }
}