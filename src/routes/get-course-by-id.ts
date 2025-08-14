import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { courses } from "../database/schema.ts"
import { db } from "../database/client.ts"
import { z } from "zod"
import { eq } from "drizzle-orm"
import { describe } from "node:test"

export const getCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
    server.get('/courses/:id', {
        schema: {
            tags: ['courses'],
            summary: 'Get a course by id',
            params: z.object({
                id: z.uuid()
            }),
            response: {
                200: z.object({
                    course: z.object({
                        id: z.uuid(),
                        title: z.string(),
                        description: z.string().nullable()
                    })
                }).describe('Course found.'),
                404: z.object({
                    message: z.string()
                }).describe('Course not found.')
            }
        }
    }, async (request, reply) => {
        const courseId = request.params.id

        const result = await db
        .select()
        .from(courses)
        .where(eq(courses.id, courseId))

        if (result.length > 0) {
            return { course: result[0] }
        }

        return reply.status(404).send()
    })
}