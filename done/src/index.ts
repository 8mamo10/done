/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';

export interface Env {
	DB: D1Database;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		try {
			return handleRequest(request, env, ctx);
		} catch (e) {
			return new Response('Error thrown.', {
				status: 500,
			});
		}
	},
} satisfies ExportedHandler<Env>;

async function handleRequest(request: Request, env: Env, ctr: ExecutionContext): Promise<Response> {
	if (request.method === 'PUT') {
		return handlePut(request, env);
	} else if (request.method === 'GET') {
		return handleGet(request, env);
	}
	return new Response('Unsupported', { status: 400 });
}

async function handlePut(request: Request, env: Env): Promise<Response> {
	const adapter = new PrismaD1(env.DB);
	const prisma = new PrismaClient({ adapter });

	// [wrangler:err] TypeError: Parsing a Body as FormData requires a Content-Type header.
	if (request.headers.get('Content-Type') === null) {
		return new Response('No Content-Type', { status: 400 });
	}
	const form = await request.formData();
	const taskId = form.get('taskId');
	if (taskId === null || taskId === '') {
		return new Response('No taskId', { status: 400 });
	}
	const task = await prisma.task.findFirst({ where: { id: Number(taskId) } });
	if (task === null) {
		return new Response(`TaskId=${taskId} not found`, { status: 404 });
	}
	await prisma.task.update({
		where: { id: Number(taskId) },
		data: { finished: !task?.finished },
	});
	return new Response(`TaskId=${taskId} was updated`);
}

async function handleGet(request: Request, env: Env): Promise<Response> {
	const adapter = new PrismaD1(env.DB);
	const prisma = new PrismaClient({ adapter });

	const users = await prisma.user.findMany();
	const tasks = await prisma.task.findMany();
	const result = JSON.stringify({ users, tasks });
	return new Response(result);
}
