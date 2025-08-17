import { test, expect } from 'vitest'
import request from 'supertest'
import { server } from '../app.ts'
import { makeUser } from '../tests/factories/make-user.ts'

test('Login', async () => {
    await server.ready()

    const { user, passwordBeforeHash } = await makeUser()

    const response = await request(server.server)
        .post('/sessions')
        .set('Content-Type', 'application/json')
        .send({
            email: user.email, 
            password: passwordBeforeHash,
        })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
        token: expect.any(String)
    })
})

test('Login with invalid email', async () => {
    await server.ready()

    const response = await request(server.server)
        .post('/sessions')
        .set('Content-Type', 'application/json')
        .send({
            email: 'invalid@email.com',
            password: '123456'
        })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
        message: 'Invalid credentials'
    })
})

test('Login with invalid password', async () => {
    await server.ready()

    const { user } = await makeUser()

    const response = await request(server.server)
        .post('/sessions')
        .set('Content-Type', 'application/json')
        .send({
            email: user.email,
            password: 'invalid-password'
        })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
        message: 'Invalid credentials'
    })
})