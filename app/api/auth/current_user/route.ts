import { decrypt } from "@/app/lib/sessions";
import { NextRequest, NextResponse } from "next/server";
import { Users } from "@/app/db/mongodb/mongo_schema";

type sessionPayload = {
    userId: string,
    expiresAt: string
}

export async function GET(request: NextRequest) {
    try {
        const session = request.cookies.get('session')?.value
        if (!session) {
            return NextResponse.json({ user: null })
        }

        console.log('Session payload:', await decrypt(session as string))

        const decrypted = await decrypt(session as string) as sessionPayload

        const data = await Users.findById(decrypted.userId).lean()

        console.log("fetched decrypt data" , data)

        return NextResponse.json({
            user: {
                id: data._id.toString(),
                username: data.username,
                email: data.email,
                role: data.role,
                dateJoined: data.dateJoined
            }
        })
    } catch (error) {
        return NextResponse.json({ user: null })
    }
}