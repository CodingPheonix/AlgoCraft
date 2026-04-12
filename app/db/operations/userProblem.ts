'use server'

import { v4 } from "uuid"
import { UserProblem } from "../mongodb/mongo_schema"


export const fetchAllProblemStatus = async (userId: string) => {
    try {
        // return await db
        //     .select({
        //         problemList: userProblemTable.problem_ids
        //     })
        //     .from(userProblemTable)
        //     .where(eq(userProblemTable.user_id, userId))

        const res = await UserProblem.findOne({ userId }).lean()

        return res?.problemIds
    } catch (error) {
        console.error(error)
    }
}

export const updateAddProblemStatus = async (userId: string, problemId: string) => {
    try {
        // const existingSet = await db.select().from(userProblemTable).where(eq(userProblemTable.user_id, userId))

        const existingSet = await UserProblem.findOne({ userId }).lean()

        if (existingSet?.id) {
            const current = existingSet.problemIds as string[] || []

            const updated = current.includes(problemId)
                ? current
                : [...current, problemId]

            await UserProblem.findOneAndUpdate(
                { _id: existingSet._id },
                { $set: { problemIds: updated } }
            )
        } else {
            const problemArr = [problemId]

            await UserProblem.create({
                userId,
                problemIds: problemArr
            })
        }
    } catch (error) {
    console.error(error)
}
}

export const updateRemoveProblemStatus = async (userId: string, problemId: string) => {
    try {
        const existingSet = await UserProblem.findOne({ userId }).lean()

        if (!existingSet?.id) return

        const current = existingSet.problemIds as string[] || []

        const updated = current.filter(id => id !== problemId)

        await UserProblem.findOneAndUpdate(
            { _id: existingSet._id },
            { $set: { problemIds: updated } }
        )
    } catch (error) {
        console.error(error)
    }
}