'use server'

import { UserRole } from "@/app/utils/type"
import { Users } from "../mongodb/mongo_schema"

export const fetchfilteredUsers = async (email: string) => {
    try {
        // return await db
        //     .select({
        //         id: usersTable.id,
        //         username: usersTable.username,
        //         email: usersTable.email,
        //         role: usersTable.role,
        //         dateJoined: usersTable.dateJoined
        //     })
        //     .from(usersTable)
        //     .where(eq(usersTable.email, email))

        // const res = await prisma.users_table.findFirst({
        //     where: {
        //         email: email
        //     }
        // })

        const res = await Users.findOne({ email })

        return res? {
            id: res.id,
            username: res.username,
            email: res.email,
            role: res.role,
            dateJoined: res.dateJoined
        } : null
    } catch (error) {
        console.error(error)
    }
}

export const alterUserRole = async (userId: string, role: UserRole) => {
    try {
        // await db
        //     .update(usersTable)
        //     .set({
        //         role: role
        //     })
        //     .where(eq(usersTable.id, userId))

        await Users.updateOne({ _id: userId }, { $set: { role } })
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllAdmins = async () => {
    try {
        // return await db
        //     .select({
        //         id: usersTable.id,
        //         username: usersTable.username,
        //         email: usersTable.email,
        //         role: usersTable.role,
        //         dateJoined: usersTable.dateJoined
        //     })
        //     .from(usersTable)
        //     .where(inArray(usersTable.role, ["admin", "super_admin", "professor"]))

        const res = await Users.find({ role: { $in: ["admin", "super_admin", "professor"] } }).lean()

        return res.map((user: any) => ({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            dateJoined: user.dateJoined
        }))
    } catch (error) {
        console.error(error)
    }
}

export const getAllUsersCount = async () => {
    try {
        // return await db
        //     .$count(usersTable)

        return await Users.countDocuments()
    } catch (error) {
        console.error(error)
    }
}