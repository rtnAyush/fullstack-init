export const cleanName = (name: string): string => {
	return name
		? name
				.toLowerCase()
				.replace(/[^\w\s]/gi, "")
				.replace(/\s+/g, "-")
		: "";
};

const ffmpegPath = require("ffmpeg-static").path;
import ffmpeg from "fluent-ffmpeg";

ffmpeg.setFfmpegPath(ffmpegPath);
import fs from "fs";
import path from "path";

export async function convertImagesToVideo(
	imagesPath: string[]
): Promise<void> {
	const videoPath = "./public/videos/video.mp4";
	await new Promise<void>((resolve, reject) => {
		ffmpeg()
			.input(`concat:${imagesPath.join("|")}`)
			.inputFPS(1 / 5) // Set frame rate to 5 seconds per frame
			.output(videoPath)
			.on("end", () => resolve())
			.on("error", (err: any) => reject(err))
			.run();
	});
}

export async function deleteImages(imagePath: string): Promise<void> {
	try {
		await new Promise(resolve => setTimeout(resolve, 1000));
		fs.unlinkSync(path.join(__dirname, '../../', imagePath)); // Delete the image file
	} catch (error: any) {
		// console.error(error);
		throw error ? error.message : "Error deleting image";
	}
}
