import { checkHasPermission } from "../constants";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
	user?: {
		// Define the properties of your user object
		id: string;
		role: string;
		// Add any other properties you have in your user object
	};
}

export const verifyTokenAndRole =
	(requiredRole: string) =>
	(req: CustomRequest, res: Response, next: NextFunction) => {
		// Check if the Authorization header is present
		const token = req.headers.authorization as string;

		if (!token) {
			return res
				.status(401)
				.json({ message: "Unauthorized - Token not provided" });
		}
		// Verify the token
		jwt.verify(
			token,
			process.env.JWT_KEY as string,
			(err: any, decoded: any) => {
				if (err) {
					return res
						.status(401)
						.json({ message: "Unauthorized - Invalid token" });
				}
				// Check if the user has the required role
				if (!checkHasPermission({ requiredRole, role: decoded.role })) {
					return res.status(403).json({
						message: "Forbidden - Insufficient permission",
					});
				}

				// Attach the decoded user information to the request object for future use
				req.user = decoded;

				next();
			}
		);
	};
