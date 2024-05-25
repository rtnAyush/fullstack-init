import Link from "next/link";
import { FaUserCog } from "react-icons/fa";
import { SlScreenDesktop } from "react-icons/sl";
import { UserNav } from "@/components/UserNav";
import getServerSessionUser from "@/hooks/getServerSessionUser";

const array = [
    {
        title: "Screen SetUp",
        icon: <SlScreenDesktop />,
        href: "/admin/screen-setup"
    },
    {
        title: "Manager Access and Permissions",
        icon: <FaUserCog />,
        href: "/admin/manager-access"
    }
]

export default async function page() {
    const currUser = await getServerSessionUser()

    return (
        <>
            <div className="shadow p-4 bg-white flex justify-center">
                <h1 className="text-2xl text-center flex-1">Admin Pannel</h1>
                <UserNav />
            </div>
            <div className="m-10 flex justify-center gap-5">
                {
                    array.map((item) => (
                        <Link href={item.href} key={item.title} className="w-[300px] bg-white hover:bg-slate-200 shadow p-2 py-8 m-2 rounded-lg flex flex-col justify-center gap-5 items-center">
                            <i className="text-6xl"> {item.icon}</i>
                            <h1 className="text-2xl text-center">{item.title}</h1>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}
