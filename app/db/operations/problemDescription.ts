'use server'

import { TutorialBlock } from "@/app/components/TextEditor"
import { Problem } from "../mongodb/mongo_schema"


export const insertProblemDescription = async (title: string, content: TutorialBlock[], problemId: string) => {
    try {
        // await db
        //     .insert(problemDescriptionTable)
        //     .values({
        //         id: v4(),
        //         title,
        //         content,
        //         problem_id: problemId
        //     })

        await Problem.updateOne(
            { _id: problemId },
            {
                $set: {
                    description: {
                        title,
                        content: JSON.stringify(content)
                    }
                }
            }
        )
    } catch (error) {
        console.error(error)
    }
}

export const fetchProblemDescription = async (problemId: string) => {
    try {
        const problem = await Problem.findOne({ _id: problemId }).lean()
        return {
            title: problem?.description?.title,
            content: problem?.description?.content
        }
    } catch (error) {
        console.error(error)
    }
}

export const updateProblemDescription = async (
    problemId: string,
    title: string,
    content: TutorialBlock[]
) => {
    try {

        await Problem.updateOne(
            { _id: problemId },
            { $set: { description: { title, content: JSON.stringify(content) } } }
        )
    } catch (error) {
        console.error(error);
    }
};

export const deleteProblemDescription = async (problemId: string) => {
    try {
        // await db
        //     .delete(problemDescriptionTable)
        //     .where(eq(problemDescriptionTable.problem_id, problemId));

        await Problem.updateOne({ _id: problemId }, { $unset: { description: "" } })
    } catch (error) {
        console.error(error);
    }
};