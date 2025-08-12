import fastify from 'fastify'
import crypto from 'node:crypto'

const server = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    }
});

type Course = {
    id: string;
    title: string;
}

const courses: Course[] = [
    { id: '1', title: 'Curso de Node.js' },
    { id: '2', title: 'Curso de React.js' },
    { id: '3', title: 'Curso de Python' },
]

server.get('/courses', () => {
    return courses
})

server.get('/courses/:id', (request, reply) => {
    type Params = {
        id: string;
    }

    const params = request.params as Params;
    const courseId = params.id;

    const course = courses.find(c => c.id === courseId);

    if (!course) {
        return reply.status(404).send({ error: 'Course not found' });
    }

    return reply.status(200).send(course);
})

server.post('/courses', (request, reply) => {
    type CourseBody = {
        title: string;
    }

    const courseId = crypto.randomUUID();

    const requestBody = request.body as CourseBody;
    const courseTitle = requestBody.title;

    if (!courseTitle) {
        return reply.status(400).send({ error: 'Title is required' })
    }

    courses.push({
        id: courseId,
        title: courseTitle,
    });
    return reply.status(201).send('ok');
})

server.listen({ port: 3000 }).then(() => {
    console.log('Server is running on http://localhost:3000')
})