import SignInWithEmail from "@/components/auth/SignInWithEmail";
import { getCookie } from "@/hooks/useCookie";
import { redirect } from "next/navigation";


export default async function page({ searchParams }: { searchParams: { error: string } }) {


    return (
        <>
            <div className="h-screen md:flex">
                <div
                    className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
                    <div className="w-2/3">
                        <h1 className="text-white font-bold text-4xl font-sans">Comm Screen</h1>
                        <p className="text-white mt-1">One Stop solution to monitor all your Plant Screens.</p>
                        {/* <button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read More</button> */}
                    </div>
                    <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                </div>
                <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
                    <SignInWithEmail />
                </div>
            </div>
        </>
    )
}
