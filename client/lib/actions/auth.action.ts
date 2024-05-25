"use server";
import { signIn, signOut } from "next-auth/react";

export async function authenticate(
	prevState: string | undefined,
	formData: FormData
) {
	try {
		// await signIn("credentials", formData);
		const values = Object.fromEntries(formData);
		const result: any = await signIn("credentials", {
			...values,
			redirect: false,
		});
		
		//success
		if (result.status === 200) {
		} else if (result.status === 401) {
			// setError("Invalid username or password.");
		}
		console.log("result", result);
	} catch (error) {
		// if (error instanceof AuthenticatorAssertionResponse) {
		// 	switch (error.authenticatorData?.errorCode) {
		// 		case "CredentialsSignin":
		// 			return "Invalid credentials.";
		// 		case "CallbackRouteError":
		// 			return "CallbackRouteError";
		// 		default:
		// 			return "Something went wrong.";
		// 	}
		// }
		throw error;
	}
}

export async function mySignOut() {
	await signOut();
}
