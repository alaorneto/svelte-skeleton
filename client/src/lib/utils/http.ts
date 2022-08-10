const api_domain = "http://localhost:3000";

export function post(endpoint: string, data: object = {}) {
	let url = api_domain.concat(endpoint);
	let json = JSON.stringify(data || {});

    return fetch(url, {
		method: 'POST',
		credentials: 'include',
		body: json,
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());
}

export function get(endpoint: string) {
	let url = api_domain.concat(endpoint);

    return fetch(url, {
		method: 'GET',
		credentials: 'include',
	}).then((r) => r.ok?r.json():r.statusText);
}