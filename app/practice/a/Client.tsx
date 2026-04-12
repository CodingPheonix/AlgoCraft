"use client"

import { VisualizerAction } from "@/app/admin/visual/create/tools"
import ArrayAnimatorsDisplay from "@/app/components/animators/ArrayAnimatorsDisplay"
import { fetchProblemWithId } from "@/app/db/operations/problems"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"


type PrevData = {
    codetext: string;
    inputArray: string;
    actionSteps: VisualizerAction[]
}

type ProblemData = {
    name: string;
    visuals: {
        code_text: string;
        code_steps: string;
        input_array: string;
    }
}

const Client = () => {

    // Refs
    const searchParams = useSearchParams()
    const problemId = searchParams.get('id') as string

    // State
    const [prevData, setPrevData] = useState<PrevData | null>(null);
    const [topic, setTopic] = useState<string>("");

    // UseEffects
    useEffect(() => {
        const fetchData = async () => {
            const prevData = await fetchProblemWithId(problemId) as ProblemData | null;

            if (prevData) {
                setPrevData({
                    codetext: prevData.visuals.code_text,
                    actionSteps: JSON.parse(prevData.visuals.code_steps) as VisualizerAction[],
                    inputArray: prevData.visuals.input_array,
                });
                setTopic(prevData.name);
            }
        }
        fetchData()
    }, [problemId])

    return (
        <div>
            <ArrayAnimatorsDisplay
                topic={topic}
                prevData={prevData as PrevData}
            />
        </div>
    )
}

export default Client
