'use server'

import { SignupFormSchema, FormState, LoginFormSchema } from "../lib/definations"
import bcrypt from 'bcrypt'

import { redirect } from "next/navigation"
import { createSession, deleteSession } from "../lib/sessions"
import { v4 as uuidv4 } from "uuid"
import { connect_to_mongo } from "../db/mongodb/connect_to_mongo"
import { Users } from "../db/mongodb/mongo_schema"

await connect_to_mongo();

export async function signup(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    console.log('Validated fields:', validatedFields)

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // 2. Prepare data for insertion into database
    const { username, email, password } = validatedFields.data
    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10)


    // check if user exists
    const existingUser = await Users.findOne({
        email: email
    })

    console.log('Existing user:', existingUser)

    if (existingUser) {
        return {
            errors: {
                email: ['Email already exists.'],
                username: ['Username already exists.'],
            },
        }
    }

    let userId = "";

    //   3. Insert the user into the database or call an Auth Library's API
    try {
        const data = await Users.create({
            username,
            email,
            password: hashedPassword,
            dateJoined: new Date(Date.now())
        })

        userId = data._id.toString()
    } catch (error) {
        return {
            message: 'An error occurred while creating your account.',
            error: error
        }
    }

    // 4. Create user session
    await createSession(userId)
    // 5. Redirect user
    redirect('/');
}

export async function login(state: FormState, formData: FormData) {
    if (!formData.get('email') || !formData.get('password')) return;

    console.log(formData)

    // Validate form fields
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // 2. Prepare data for insertion into database
    const { email, password } = validatedFields.data
    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10)

    console.log(hashedPassword)


    // check if user exists
    const existingUser = await Users.findOne({ email })

    if (!existingUser) {
        return {
            errors: {
                email: ['Email does not exist.'],
            },
        }
    }

    // 4. Create user session
    await createSession(existingUser.id as unknown as string)
    // 5. Redirect user
    redirect('/');
}

export async function logout() {
    await deleteSession();
    redirect('/login')
}