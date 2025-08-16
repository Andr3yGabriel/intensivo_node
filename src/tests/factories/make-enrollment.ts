import { db } from "../../database/client"
import { enrollments } from "../../database/schema"

export async function makeEnrollment(courseId: string, userId: string) {
    const result = await db.insert(enrollments).values({
        courseId,
        userId,
    }).returning()

    return result[0]
}