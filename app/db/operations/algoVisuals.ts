'use server'

import { VisualizerAction } from "@/app/admin/visual/create/tools"
import { Subtopic } from "../mongodb/mongo_schema"

export const insertVisuals = async ({ subTopicId, code, codeSteps, inputValues }: {
    subTopicId: string,
    code: string,
    codeSteps: VisualizerAction[],
    inputValues: string
}) => {
    try {
        // await db
        //     .insert(algoVisualsTable)
        //     .values({
        //         id: UUIDv4(),
        //         subtopic_id: subTopicId,
        //         code_text: code,
        //         code_steps: codeSteps,
        //         input_array: inputValues
        //     })

        await Subtopic.updateOne(
            { _id: subTopicId },
            {
                $set: {
                    algovisuals: {
                        code_text: code,
                        code_steps: JSON.stringify(codeSteps),
                        input_array: inputValues
                    }
                }
            }
        )
    } catch (error) {
        console.error(error)
    }
}

export const fetchVisuals = async (subTopicId: string) => {
    try {
        // return await db
        //     .select({
        //         'code': algoVisualsTable.code_text,
        //         'steps': algoVisualsTable.code_steps,
        //         'inputArray': algoVisualsTable.input_array
        //     })
        //     .from(algoVisualsTable)
        //     .where(eq(algoVisualsTable.subtopic_id, subTopicId))

        const subtopic = await Subtopic.findOne({ _id: subTopicId }).lean()
        const algoviz = subtopic?.algovisuals

        return {
            code: algoviz?.code_text,
            steps: algoviz?.code_steps,
            inputArray: algoviz?.input_array
        }
    } catch (error) {
        console.error(error)
    }
}