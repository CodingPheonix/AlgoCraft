'use client'

import React, { useCallback, useState } from 'react'
import { FileSpreadsheet, Play } from 'lucide-react'
import { CiYoutube } from "react-icons/ci";
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';


export type CourseItem = {
    "id": string;
    "name": string;
    "description": string;
    "difficulty": "Easy" | "Normal" | "Hard";
    "externalLink": string;
}

type AlgoCardProps = {
    "id": string;
    "heading": string;
    "course": CourseItem[];
}

const AlgoCard = (item: CourseItem) => {

    const [showPopUp, setShowPopUp] = useState(false)

    const router = useRouter();

    const handleClosePopup = useCallback(() => {
        setShowPopUp(false);
    }, []);

    return (
        <div id={item.name.toLowerCase().replace(" ", "_")} className='flex md:flex-row flex-col w-full justify-around items-center md:gap-0 gap-2 rounded-lg'>
            <Toaster />

            <h3 className="text-lg font-semibold md:w-1/4 w-full text-center md:text-start">{item.name}</h3>

            {/* divider */}
            <span className='w-full h-[0.5px] bg-black md:hidden block'></span>

            <p className="text-sm md:mt-2 w-1/4 text-start md:block hidden">{item.description}</p>
            <span className='w-1/4 flex justify-center items-center'>
                <span className={`inline-block px-2 py-1 text-md rounded-full font-semibold mt-2 ${item.difficulty === "Easy" ? "text-green-500" :
                    item.difficulty === "Normal" ? "text-yellow-500 " :
                        "text-red-500"
                    }`}>
                    {item.difficulty}
                </span>
            </span>

            {/* divider */}
            <span className='w-full h-[0.5px] bg-black md:hidden block'></span>
            
            <span className='flex w-1/4 justify-center items-center gap-3'>
                <button onClick={() => { router.push(`/learn/topic?id=${item.id}`) }} className="text-black hover:text-blue-600 px-3 py-1 rounded mr-2 hover:cursor-pointer">
                    <FileSpreadsheet className="w-4 h-4" />
                </button>
                <button onClick={() => { router.push(`/learn/tutorial?id=${item.id}`) }} className=" text-black hover:text-yellow-500 px-3 py-2 rounded hover:cursor-pointer">
                    <Play className="w-4 h-4" />
                </button>
                <button onClick={() => { item.externalLink ? router.push(item.externalLink) : toast('No Link Available!') }} className=" text-black hover:text-red-500 px-3 py-2 rounded hover:cursor-pointer">
                    <CiYoutube className="w-4 h-4" />
                </button>
            </span>
        </div>
    )
}

export default AlgoCard
