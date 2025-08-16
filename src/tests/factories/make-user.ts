import { fakerPT_BR as faker } from "@faker-js/faker"
import { db } from "../../database/client"
import { users } from "../../database/schema"

export async function makeUser(name?: string, email?: string) {
    const result = await db.insert(users).values({
        name: name ?? faker.person.fullName(),
        email: email ?? faker.internet.email(),
    }).returning()

    return result[0]
}