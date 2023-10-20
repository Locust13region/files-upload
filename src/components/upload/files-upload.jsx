/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import RemoteRequest from "../service";
import { Button } from "reactstrap";

export default function FilesUpload({ setIsSend }) {
	const [selectedFiles, setSelectedFiles] = useState("");
	const fileInputRef = useRef(null);

	const handleFileChange = (event) => {
		const files = event.target.files;
		setSelectedFiles(files);
	};

	const handleFileSend = () => {
		const url = "http://localhost:3000/uploadFiles";
		const method = "POST";
		const form = new FormData();
		for (let i = 0; i < selectedFiles.length; i++) {
			form.append("files", selectedFiles[i]);
		}
		RemoteRequest(url, method, form)
			.then((data) => {
				console.log("Ответ от сервера:", data);
			})
			.then(() => {
				setSelectedFiles("");
				fileInputRef.current.value = "";
				setIsSend(true);
			});
	};

	return (
		<div className="upLoadList">
			<input
				type="file"
				multiple={true}
				onChange={handleFileChange}
				ref={fileInputRef}
			/>
			<div>
				<ol>
					{selectedFiles.length === 0 ? (
						<li>Нет выбранных файлов</li>
					) : (
						[...selectedFiles].map((file, index) => (
							<li key={index}>{file.name}</li>
						))
					)}
				</ol>
			</div>
			<Button onClick={handleFileSend}>Отправить</Button>
		</div>
	);
}
