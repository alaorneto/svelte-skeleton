import jwt from 'jwt-decode';

export function respond(body) {
	if (body.errors) {
		return { status: 401, body };
	}

	const token = body.token;
    const payload = jwt(token);
	const user = payload.user
	
	return {
		headers: {
			'set-cookie': `jwt=${token}; Path=/; HttpOnly`
		},
		body: user
	};
}