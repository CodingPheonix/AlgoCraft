'use server'

import { VisualizerAction } from "@/app/admin/visual/create/tools"
import { Problem } from "../mongodb/mongo_schema"

export const insertProblemVisuals = async ({ problemId, codeText, codeSteps, inputArray }: {
    problemId: string,
    codeText: string,
    codeSteps: VisualizerAction[],
    inputArray: string
}) => {
    try {
        // await db
        //     .insert(problemVisualsTable)
        //     .values({
        //         id: UUIDv4(),
        //         problem_id: problemId,
        //         code_text: codeText,
        //         code_steps: codeSteps,
        //         input_array: inputArray
        //     })

        await Problem.updateOne(
            { _id: problemId },
            {
                $set: {
                    visuals: {
                        code_text: codeText,
                        code_steps: codeSteps.toString(),
                        input_array: inputArray
                    }
                }
            }
        )
    } catch (error) {
        console.error(error)
    }
}

export const fetchProblemVisuals = async (problemId: string) => {
    try {
        // return await db
        //     .select({
        //         'codeText': problemVisualsTable.code_text,
        //         'codeSteps': problemVisualsTable.code_steps,
        //         'inputArray': problemVisualsTable.input_array
        //     })
        //     .from(problemVisualsTable)
        //     .where(eq(problemVisualsTable.problem_id, problemId))

        const problem = await Problem.findOne({ _id: problemId }).lean()
        const visuals = problem?.visuals

        return {
            codeText: visuals?.code_text,
            codeSteps: visuals?.code_steps,
            inputArray: visuals?.input_array
        }
    } catch (error) {
        console.error(error)
    }
}

export const updateProblemVisuals = async (problemId: string, { codeText, codeSteps, inputArray }: {
    codeText?: string,
    codeSteps?: VisualizerAction[],
    inputArray?: string
}) => {
    try {
        // await db
        //     .update(problemVisualsTable)
        //     .set({
        //         ...(codeText && { code_text: codeText }),
        //         ...(codeSteps && { code_steps: codeSteps }),
        //         ...(inputArray && { input_array: inputArray })
        //     })
        //     .where(eq(problemVisualsTable.problem_id, problemId))

        await Problem.updateOne(
            { _id: problemId },
            {
                $set: {
                    visuals: {
                        ...(codeText && { code_text: codeText }),
                        ...(codeSteps && { code_steps: codeSteps.toString() }),
                        ...(inputArray && { input_array: inputArray })
                    }
                }
            }
        )
    } catch (error) {
        console.error(error)
    }
}

export const deleteProblemVisuals = async (problemId: string) => {
    try {
        // await db
        //     .delete(problemVisualsTable)
        //     .where(eq(problemVisualsTable.problem_id, problemId))

        await Problem.updateOne({ _id: problemId }, { $unset: { visuals: "" } })
    } catch (error) {
        console.error(error)
    }
}
