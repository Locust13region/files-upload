/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import RemoteRequest from "../service";
import { Button } from "reactstrap";

export default function FileUpload({ setIsSend }) {
	const [selectedFile, setSelectedFile] = useState("");
	const fileInputRef = useRef(null);

	const handleFileChange = (event) => {
		const file = event.target.files;
		setSelectedFile(file);
	};

	const handleFileSend = () => {
		const url = "http://localhost:3000/uploadFile";
		const method = "POST";
		const form = new FormData();

		form.append("file", selectedFile[0]);

		RemoteRequest(url, method, form)
			.then((data) => {
				console.log("Ответ от сервера:", data);
			})
			.then(() => {
				setSelectedFile("");
				fileInputRef.current.value = "";
				setIsSend(true);
			});
	};

	return (
		<div className="upLoadList">
			<input
				type="file"
				multiple={false}
				onChange={handleFileChange}
				ref={fileInputRef}
			/>
			<div>
				<ol>
					{selectedFile.length === 0 ? (
						<div>Файл не выбран</div>
					) : (
						<div>{selectedFile[0].name}</div>
					)}
				</ol>
			</div>
			<Button onClick={handleFileSend}>Отправить</Button>
		</div>
	);
}
