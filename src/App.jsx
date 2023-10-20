import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FileUpload from "./components/upload/file-upload";
import FilesUpload from "./components/upload/files-upload";
import RemoteList from "./components/remote-list";
import { useState } from "react";
function App() {
	const [isSend, setIsSend] = useState(false);
	return (
		<section>
			<FileUpload setIsSend={setIsSend} />
			<FilesUpload setIsSend={setIsSend} />
			<RemoteList
				isSend={isSend}
				setIsSend={setIsSend}
			/>
		</section>
	);
}

export default App;
