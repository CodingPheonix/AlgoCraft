'use server'

import { Set, Problem } from "../mongodb/mongo_schema"
// import type { Problem } from "@/app/admin/problem/page"


export const insertSet = async (name: string, author_id: string, id?: string) => {
    try {
        await Set.create({
            name,
            authorId: author_id,
            problemIds: []
        })
    } catch (error) {
        console.error(error)
    }
}

export const fetchSetWithProblemsById = async (userId: string) => {
    try {
        // const rows = await db
        //     .select({
        //         setId: setTable.id,
        //         setName: setTable.name,
        //         problemId: problemTable.id,
        //         problemName: problemTable.name,
        //         problemLink: problemTable.link,
        //         problemDifficulty: problemTable.difficulty,
        //         problemVideoLink: problemTable.video_link
        //     })
        //     .from(setTable)
        //     .where(eq(setTable.author_id, userId))
        //     .leftJoin(
        //         setProblemTable,
        //         eq(setProblemTable.set_id, setTable.id)
        //     )
        //     .leftJoin(
        //         problemTable,
        //         eq(problemTable.id, setProblemTable.problem_id)
        //     );

        // const setMap = new Map<
        //     string,
        //     {
        //         id: string;
        //         name: string;
        //         problems: Problem[];
        //     }
        // >();

        // for (const row of rows) {
        //     if (!setMap.has(row.setId)) {
        //         setMap.set(row.setId, {
        //             id: row.setId,
        //             name: row.setName,
        //             problems: []
        //         });
        //     }

        //     const set = setMap.get(row.setId);

        //     if (row.problemId && set) {
        //         set.problems.push({
        //             id: row.problemId,
        //             name: row.problemName as string,
        //             link: row.problemLink as string,
        //             difficulty: row.problemDifficulty as "Easy" | "Normal" | "Hard",
        //             videoLink: row.problemVideoLink as string
        //         });
        //     }
        // }

        // return Array.from(setMap.values());


        const sets = await Set.find({ authorId: userId }).lean()

        return await Promise.all(
            sets.map(async (set: any) => {
                const problems = await Problem.find({ setId: set.id }).lean()
                return {
                    id: set.id,
                    name: set.name,
                    problems: problems.map((problem: any) => ({
                        id: problem.id,
                        name: problem.name,
                        link: problem.link,
                        difficulty: problem.difficulty as "Easy" | "Normal" | "Hard",
                        videoLink: problem.video_link
                    }))
                }
            })
        )

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