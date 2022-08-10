import { post as api_post } from '$lib/utils/http';
import { respond } from './_respond';

export async function POST({ request }) {
	const json = await request.json();
	
    const body = await api_post('/api/login/jwt', 
		{
			username: json.username,
			password: json.password
		}
	);
    
	return respond(body);
}