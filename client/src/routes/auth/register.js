import { post as api_post } from '$lib/utils/http';
import { respond } from './_respond';

export async function POST({ request }) {
	const user = await request.json();

	// TODO individual properties
	const body = await api_post('users', { user });

	return respond(body);
}