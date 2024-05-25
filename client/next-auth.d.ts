import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { PlantType, ScreenType } from "./types";

declare module "next-auth" {
	interface Session {
		user: {
			_id: string;
			username: string;
			email: string;
			firstName: string;
			lastName: string;
			role: string;
			plantId: string | PlantType;
			screenIds: string[] | ScreenType[];
			userJwt: string;
		} & DefaultSession;
	}
	interface User extends DefaultUser {
		_id: string;
		username: string;
		email: string;
		firstName: string;
		lastName: string;
		role: string;
		plantId: string | PlantType;
		screenIds: string[] | ScreenType[];
		userJwt: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		_id: string;
		username: string;
		email: string;
		firstName: string;
		lastName: string;
		role: string;
		plantId: string | PlantType;
		screenIds: string[] | ScreenType[];
		userJwt: string;
	}
}
