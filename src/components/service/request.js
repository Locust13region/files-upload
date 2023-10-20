export default function RemoteRequest(url, method, body) {
	return fetch(url, { method: method, body: body })
		.then((response) => {
			if (response.status === 200) {
				return response.json();
			} else {
				throw new Error(`Ошибка при запросе: ${response.status}`);
			}
		})
		.catch((error) => {
			console.error(`Произошла ошибка: ${error}`);
		});
}
