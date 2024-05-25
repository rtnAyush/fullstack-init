import Link from "next/link";
import { FaUserCog } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { UserNav } from "@/components/UserNav";


const array = [
    {
        title: "Add plants",
        icon: <MdAdminPanelSettings />,
        href: "/super-admin/add-plants"
    },
    {
        title: "Admin Access and Permissions",
        icon: <FaUserCog />,
        href: "/super-admin/add-admins"
    }
]

export default async function page() {
    return (
        <>
            <div className="shadow p-4 bg-white flex justify-center">
                <h1 className="text-2xl text-center flex-1">Super Admin Pannel</h1>
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
