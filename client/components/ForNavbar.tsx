"use client";
import { useSearchParams } from 'next/navigation';
import capitalize from "lodash/capitalize";



export default function ForNavbar() {
    const searchParams = useSearchParams()
    const forName = searchParams.get('for') as string;
    const type = searchParams.get('type') as string;

    return (
        <div className="print:hidden bg-white shadow px-4 py-2 mb-1 flex justify-between">
            <h1 className="flex-1 text-2xl text-center self-center">{capitalize(forName)} {capitalize(type)} Dashboard</h1>
            <section className="flex flex-col justify-end items-end">
                <div className="text-center">
                    <h2 className="">Plant: Detorit</h2>
                    <input type="month" name="" id="" defaultValue={new Date().toISOString().split('T')[0].slice(0, 7)}
                        className="border rounded-lg p-1 text-center text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-transparent"
                    />
                </div>
            </section>
        </div>
    )
}
