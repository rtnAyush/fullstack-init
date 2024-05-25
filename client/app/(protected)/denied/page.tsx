import { UserNav } from '@/components/UserNav'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { FaUserSlash } from 'react-icons/fa'

export default function page() {
    return (
        <>
            <div className="shadow p-4 bg-white flex justify-center">
                <h1 className="text-2xl text-center flex-1">Access denied</h1>
                <UserNav />
            </div>
            <div className="m-10 flex justify-center gap-5">
                <div className="min-w-[300px] bg-white hover:bg-slate-200 shadow p-2 py-8 m-2 rounded-lg flex flex-col justify-center gap-5 items-center">
                    <i className="text-6xl"> <FaUserSlash /></i>
                    <h1 className="text-2xl text-center">You do not have Required Permission to see this Page!!!</h1>
                    <Link href="/">
                        <Button type='button' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Go to Home</Button>
                    </Link>
                </div>
            </div>
        </>
    )
}
