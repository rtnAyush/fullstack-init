"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from 'react-dom';


export default function SignInWithEmail() {

    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const router = useRouter()
    async function authenticate(
        prevState: void | undefined,
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
                router.push('/upload')
            }
            else if (result.status === 401) {
                throw new Error(result.message ?? "Invalid username or password.");
            }

        } catch (error: any) {
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
            console.error(error.message);

            return error.message;

        }
    }

    return (
        <form action={dispatch} className="bg-white text-center relative">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello User!</h1>
            <p className="text-sm font-normal text-gray-600 mb-7">Welcome to the KPI</p>

            <div
                className="absolute top-[23%] left-[50%] -translate-y-[50%] -translate-x-[50%] flex my-2 items-end space-x-1 text-center"
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage ? <p className="text-sm whitespace-nowrap text-red-500">! {(errorMessage)}</p> : ""}
            </div>

            {/* email */}
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input className="pl-2 outline-none border-none" required type="email" name="email" id="" placeholder="Email Address" />
            </div>
            {/* password */}
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd" />
                </svg>
                <input className="pl-2 outline-none border-none" type="password" required name="password" id="" placeholder="Password" />
            </div>
            <LoginButton />
            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>
        </form>
    )
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button aria-disabled={pending} className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">{pending ? "Submitting..." : "Login"}</button>
    );
}
