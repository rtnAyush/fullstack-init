import express, {
	ErrorRequestHandler,
	NextFunction,
	Request,
	Response,
} from "express";
require("dotenv").config();
import routes from "./routes";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

// const swaggerFile = fs.readFileSync(path.resolve(__dirname, './swagger.json'), 'utf-8');
// const swaggerDocument = JSON.parse(swaggerFile);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error("MONGODB_URI is not defined in the .env file");
}

const app = require(".");

const PORT = process.env.PORT || 3000;

const start = async () => {
	try {
		let mongooseConnected = false;
		while (!mongooseConnected) {
			console.info("Attempting to connect to MongoDb...");
			try {
				await mongoose.connect(MONGODB_URI);
				mongooseConnected = true;
				console.info("Connected to MongoDb");
			} catch (err) {
				console.error(
					"Error connecting to MongoDb. Retrying in 5 seconds..."
				);
				await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
			}
		}
	} catch (err) {
		console.error(err);
	}

	app.listen(PORT, async () => {
		console.info(`listening on port ${PORT}`);
	});
};

app.use("/api", routes);

if (process.env.NODE_ENV?.trim() === "development") {
	// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

const errorHandler: ErrorRequestHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(err);
	res.status(500).json({ error: err.message });
};

app.use(errorHandler);

start();
