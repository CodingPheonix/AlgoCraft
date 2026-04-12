'use server'

import { Problem } from "@/app/admin/problem/page";
import { Set, Problem as ProblemModel } from "../mongodb/mongo_schema"
import { Difficulty } from "@/app/utils/type";

export type ProblemSchema = {
  _id: string
  name: string
  link: string
  difficulty: Difficulty
  video_link?: string | null
  visuals?: object
  description?: object
  authorId: string
  setId: string
  hints?: string[]
}

export type SetWithProblems = {
    id: string
    title: string
    problems: ProblemSchema[]
}

export const insertProblem = async (problem: Problem, authorId: string, setId: string) => {
    try {
        const data = await ProblemModel.create({
            name: problem.name,
            link: problem.link,
            difficulty: problem.difficulty,
            video_link: problem.videoLink,
            authorId,
            setId
        })

        await Set.findOneAndUpdate({ _id: setId }, {
            $push: { problemIds: data._id }
        })
    } catch (error) {
        console.error(error);
    }
}

export const fetchProblemHints = async (problemId: string) => {
    try {
        const res = await ProblemModel.findById(problemId).lean()
        return res?.hints as string[]
    } catch (error) {
        console.log(error)
    }
}

export const updateProblem = async (problem: Problem) => {

    console.log(problem)
    try {
        await ProblemModel.updateOne({ _id: problem.id }, {
            $set: {
                name: problem.name,
                link: problem.link,
                difficulty: problem.difficulty,
                video_link: problem.videoLink
            }
        })
    } catch (error) {
        console.error(error)
    }
}

export const removeProblem = async (problemId: string) => {
    try {
        // await db
        //     .delete(problemTable)
        //     .where(eq(problemTable.id, problemId))

        await ProblemModel.deleteOne({ _id: problemId })
    } catch (error) {
        console.error(error)
    }
}

export const uploadHints = async (problemId: string, hints: string[]) => {
    try {
        // await db
        //     .update(problemTable)
        //     .set({ hints: hints })
        //     .where(eq(problemTable.id, problemId));

        await ProblemModel.updateOne({ _id: problemId }, { $set: { hints } })
    } catch (error) {
        console.error(error);
    }
}

export const getTotalProblemCount = async () => {
    try {
        // return await db
        //     .$count(problemTable)

        return ProblemModel.countDocuments()
    } catch (error) {
        console.error(error)
    }
}

export const fetchProblemWithId = async (problemId: string) => {
    try {
        const data = await ProblemModel.findById(problemId).lean();
        return {
            name: data?.name || "",
            visuals: {
                code_text: data?.visuals?.code_text || "",
                code_steps: data?.visuals?.code_steps || "",
                input_array: data?.visuals?.input_array || ""
            }
        }
    } catch (error) {
        console.error(error)
    }
}

export const fetchAllSetProblemWithSolutionAndAnimations = async () => {
    try {
        const sets = await Set.find().lean()

        const data: SetWithProblems[] = await Promise.all(
            sets.map(async (set, _) => {

                const problemsWithDetails = await Promise.all(
                    set.problemIds.map(async (id: string) => {
                        const problem = await ProblemModel.findById(id).lean() as ProblemSchema
                        return {
                            id: problem?._id.toString(),
                            title: problem.name,
                            link: problem.link,
                            video: problem.video_link,
                            difficulty: problem.difficulty,
                            hints: problem.hints,
                            descriptionId: problem.description ? problem._id + '_desc' : null,
                            visualsId: problem.visuals ? problem._id + '_visuals' : null,
                            status: false
                        }
                    })
                )
                return {
                    id: set._id.toString(),
                    title: set.name,
                    problems: problemsWithDetails
                }
            })
        )

        return data;
    } catch (error) {
        console.error(error)
    }
}