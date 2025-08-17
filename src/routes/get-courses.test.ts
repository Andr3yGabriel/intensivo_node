import { test, expect } from 'vitest'
import request from 'supertest'
import { server } from '../app.ts'
import { randomUUID } from 'node:crypto'
import { makeCourse } from '../tests/factories/make-course.ts'
import { makeAuthenticatedUser, makeUser } from '../tests/factories/make-user.ts'
import { makeEnrollment } from '../tests/factories/make-enrollment.ts'

test('Create a course', async () => {
    await server.ready()

    const titleID = randomUUID()

    const course = await makeCourse(titleID)

    const { user, token } = await makeAuthenticatedUser('student')

    await makeEnrollment(course.id, user.id)

    const response = await request(server.server)
        .get(`/courses?search=${titleID}`)
        .set('Authorization', token)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
        total: 1,
        courses: [
            {
                id: expect.any(String),
                title: titleID,
                enrollments: 1,
            }
        ]
    })
})