import { fakerPT_BR as faker } from "@faker-js/faker"
import { db } from "../../database/client"
import { users } from "../../database/schema"
import { hash } from "argon2"
import { randomUUID } from "node:crypto"
import jwt from "jsonwebtoken"

export async function makeUser(name?: string, email?: string, role?: 'student' | 'manager') {
    const passwordBeforeHash = randomUUID()

    const result = await db.insert(users).values({
        name: name ?? faker.person.fullName(),
        email: email ?? faker.internet.email(),
        password: await hash(passwordBeforeHash),
        role
    }).returning()

    return {
        user: result[0],
        passwordBeforeHash
    }
}

export async function makeAuthenticatedUser(role: 'student' | 'manager') {
    const { user } = await makeUser(undefined, undefined, role)

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET must be set')
    }
    
    const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET)

    return {
        user,
        token
    }
}