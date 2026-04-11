"use server"

import { Tutorials, Subtopic } from "../mongodb/mongo_schema"

export const insertTutorial = async ({ title, authorId, type }: { id?: string, title: string, authorId: string, type: "algorithm" | "data_structure" }) => {
    try {
        const data = await Tutorials.create({
            title,
            authorId,
            type
        })

        return {
            id: data._id.toString() || ""
        }
    } catch (error) {
        console.error("Error inserting tutorial:", error)
        throw error
    }
}

export const fetchTutorials = async (authorId: string) => {
    try {

        return await Tutorials.find({ authorId }).lean()
    } catch (error) {
        console.error("Error fetching tutorials:", error)
        throw error
    }
}

// export const fetchTutorialsWithSubtopic = async (authorId: string) => {
//     if (!authorId) return;
//     try {
//         if (!authorId) return [];

//         const tutorials = await Tutorials.find({ authorId }).lean()

//         return await Promise.all(
//             tutorials.map(async (tutorial: any) => {
//                 const subtopics = await Subtopic.find({ tutorialId: tutorial.id }).lean()
//                 return {
//                     id: tutorial._id.toString(),
//                     title: tutorial.title,
//                     type: tutorial.type,
//                     subtopics: subtopics.map(sub => ({
//                         id: sub._id.toString(),
//                         name: sub.name,
//                         description: sub.description,
//                         difficulty: sub.difficulty,
//                         external_video: sub.external_video
//                     }))
//                 }
//             })
//         )
//     } catch (error) {
//         throw error;
//     }
// };

export const fetchTutorialsWithSubtopic = async (authorId: string) => {
    if (!authorId) return [];

    try {
        const tutorials = await Tutorials.find({ authorId }).lean();

        // Collect all subtopicIds from all tutorials
        const allSubtopicIds = tutorials.flatMap(t => t.subtopicIds || []);

        // Fetch all subtopics at once
        const subtopics = await Subtopic.find({
            _id: { $in: allSubtopicIds }
        }).lean();

        // Create a map for quick lookup
        const subtopicMap = new Map(
            subtopics.map(sub => [sub._id.toString(), sub])
        );

        return tutorials.map((tutorial: any) => {
            const mappedSubtopics = (tutorial.subtopicIds || [])
                .map((id: string) => subtopicMap.get(id))
                .filter(Boolean);

            return {
                id: tutorial._id.toString(),
                title: tutorial.title,
                type: tutorial.type,
                subtopics: mappedSubtopics.map((sub: { _id: { toString: () => string }; name: string; description: string; difficulty: string; external_video: string }) => ({
                    id: sub._id.toString(),
                    name: sub.name,
                    description: sub.description,
                    difficulty: sub.difficulty,
                    external_video: sub.external_video
                }))
            };
        });

    } catch (error) {
        throw error;
    }
};

export const fetchAllTutorialsWithSubtopic = async () => {
    try {
        const tutorials = await Tutorials.find().lean()

        return await Promise.all(
            tutorials.map(async (tutorial: any) => {
                const allSubtopics = tutorial.subtopicIds || [];

                const subtopics = await Promise.all(
                    allSubtopics.map(async (id: string) => {
                        const sub = await Subtopic.findById(id).lean();
                        return sub ? {
                            id: sub._id.toString(),
                            name: sub.name,
                            description: sub.description,
                            difficulty: sub.difficulty,
                            external_video: sub.external_video
                        } : null;
                    })
                );

                // const subtopics = await Subtopic.find({ tutorialId: tutorial.id }).lean()
                console.log(tutorial)
                return {
                    id: tutorial._id.toString(),
                    title: tutorial.title,
                    type: tutorial.type,
                    subtopics: subtopics
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