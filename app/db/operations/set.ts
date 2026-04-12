'use server'

import { Set, Problem } from "../mongodb/mongo_schema"
import { ProblemSchema, SetWithProblems } from "./problems"
// import type { Problem } from "@/app/admin/problem/page"

type Set = {
    _id: string
    name: string
    authorId: string
    problemIds: string[]
}


export const insertSet = async (name: string, author_id: string, id?: string) => {
    try {
        const data = await Set.create({
            name,
            authorId: author_id,
            problemIds: []
        })

        return {
            id: data._id.toString() as string,
            name: data.name as string,
            problems: data.problemIds as string[]
        }
    } catch (error) {
        console.error(error)
    }
}

export const fetchSetWithProblemsById = async (userId: string) => {
    console.log("user id is", userId)
    try {
        const sets = await Set.find({ authorId: userId }).lean()

        console.log("sets are", sets)

        const data = await Promise.all(
            sets.map(async (set) => {
                const problems = await Promise.all(
                    (set.problemIds || []).map(async (id: string) => {
                        const problem = await Problem.findById(id).lean() as ProblemSchema
                        if (!problem) return null

                        return {
                            id: problem._id.toString(),
                            name: problem.name,
                            link: problem.link,
                            difficulty: problem.difficulty as "Easy" | "Normal" | "Hard",
                            videoLink: problem.video_link
                        }
                    })
                )

                return {
                    id: set._id.toString(),
                    name: set.name,
                    problems: problems
                }
            })
        )

        return data
    } catch (error) {
        throw error
    }
};

export const deleteSetById = async (id: string) => {
    try {
        await Set.deleteOne({ _id: id })
    } catch (error) {
        console.error(error)
    }
}