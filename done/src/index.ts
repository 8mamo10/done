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
		const adapter = new PrismaD1(env.DB);
		const prisma = new PrismaClient({ adapter });

		if (request.method === 'PUT') {
			const form = await request.formData();
			const taskId = form.get('taskId');
			if (taskId === null) {
				return new Response('No taskId', { status: 400 });
			}
			const tasks = await prisma.task.findFirst({ where: { id: Number(taskId) } });
			await prisma.task.update({
				where: { id: 1 },
				data: { finished: !tasks?.finished },
			});
			return new Response('Updated');
		}

		const users = await prisma.user.findMany();
		const tasks = await prisma.task.findMany();
		const result = JSON.stringify({ users, tasks });
		return new Response(result);
	},
} satisfies ExportedHandler<Env>;
