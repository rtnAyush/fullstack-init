import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
	destination: function (req: Request, file: Express.Multer.File, cb) {
		cb(null, "./public/images");
	},
	filename: function (req: Request, file: Express.Multer.File, cb) {
		const uniqueSuffix = Date.now();
		// const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

		cb(
			null,
			file.fieldname +
				"-" +
				uniqueSuffix +
				"-" +
				file.originalname.split(" ").join("")
		);
	},
});

const upload = multer({ storage: storage });

export default upload;
