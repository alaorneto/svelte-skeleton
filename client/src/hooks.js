import * as cookie from 'cookie';
import jwt_decode from 'jwt-decode';

export async function handle({ event, resolve }) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	const data = cookies.jwt;
	
	if (data) {
		const payload = jwt_decode(data);
		event.locals.user = payload.user;
	} else {
		event.locals.user = undefined;
	}
	return await resolve(event);
}

export function getSession({ locals }) {
	return {
		user: locals.user && {
            _id: locals.user._id,
			username: locals.user.username,
		}
	};
}