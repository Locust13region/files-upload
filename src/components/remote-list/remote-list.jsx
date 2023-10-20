/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import RemoteRequest from "../service/request";

export default function RemoteList({ isSend, setIsSend }) {
	const url = "http://localhost:3000/files";
	const [filesList, setFilesList] = useState([]);

	useEffect(() => {
		RemoteRequest(url, undefined, undefined).then((data) => {
			console.log("Ответ от сервера:", data);
			setFilesList(data);
			setIsSend(false);
		});
	}, [setIsSend, isSend]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			RemoteRequest(url, undefined, undefined).then((data) => {
				console.log("Ответ от сервера:", data);
				setFilesList(data);
			});
		}, 30000);
		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<div className="downLoadList">
			<p>Список загруженных файлов:</p>
			<ol>
				{filesList.files &&
					filesList.files.map((file, index) => (
						<li key={index}>
							<a
								target="_blank"
								rel="noreferrer"
								href={url.substring(0, 21) + file.substring(1)}
							>
								{file.match(/(?<=.\/uploads\/).*/)}
							</a>
						</li>
					))}
			</ol>
		</div>
	);
}
