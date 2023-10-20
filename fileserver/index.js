const express = require("express");
const multer = require("multer");
const fs = require("fs");
var cors = require("cors");
const app = express();
app.use(cors());
const port = 3000;
app.use("/uploads", express.static("uploads"));

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		let ext = file.originalname.substring(
			file.originalname.lastIndexOf("."),
			file.originalname.length
		);
		cb(null, Date.now() + ext);
	},
});
const uploadFile = multer({
	storage: storage,
});
const uploadFiles = multer({
	storage: storage,
});

app.post("/uploadFile", uploadFile.single("file"), function (req, res, next) {
	res.json({ fileName: req.file.filename, success: true });
});

app.post("/uploadFiles", uploadFiles.array("files"), function (req, res, next) {
	res.json({
		fileNames: req.files.map((file) => file.filename),
		success: true,
	});
});

app.get("/files", function (req, res, next) {
	const filesInTheFolder = getFiles("./uploads");
	res.json({ files: filesInTheFolder });
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

function getFiles(dir, files = []) {
	const fileList = fs.readdirSync(dir);
	for (const file of fileList) {
		const name = `${dir}/${file}`;
		if (fs.statSync(name).isDirectory()) {
			getFiles(name, files);
		} else {
			files.push(name);
		}
	}
	return files;
}
