'use server'

import { v4 } from "uuid"
import { TutorialBlock } from "@/app/components/TextEditor"
import { ProblemDescription } from "../mongodb/mongo_schema"


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

        await ProblemDescription.create({
            _id: v4(),
            problemId,
            title,
            content: JSON.stringify(content)
        })
    } catch (error) {
        console.error(error)
    }
}

export const fetchProblemDescription = async (problemId: string) => {
    try {
        // return await db
        //     .select()
        //     .from(problemDescriptionTable)
        //     .where(eq(problemDescriptionTable.problem_id, problemId))

        return await ProblemDescription.findOne({ problemId }).lean()
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
        // await db
        //     .update(problemDescriptionTable)
        //     .set({
        //         title,
        //         content
        //     })
        //     .where(eq(problemDescriptionTable.problem_id, problemId));

        await ProblemDescription.updateOne({ problemId }, { $set: { title, content: JSON.stringify(content) } })
    } catch (error) {
        console.error(error);
    }
};

export const deleteProblemDescription = async (problemId: string) => {
    try {
        // await db
        //     .delete(problemDescriptionTable)
        //     .where(eq(problemDescriptionTable.problem_id, problemId));

        await ProblemDescription.deleteOne({ problemId })
    } catch (error) {
        console.error(error);
    }
};