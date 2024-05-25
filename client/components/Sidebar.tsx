"use client"
// import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RiExpandLeftRightLine } from "react-icons/ri";
import { MdAdminPanelSettings, MdOutlineFileUpload } from "react-icons/md";
import { SlScreenDesktop } from "react-icons/sl";
import { CiViewList, CiEdit } from "react-icons/ci";
import { FaUserCog } from "react-icons/fa";
import { usePathname } from "next/navigation";
import capitalize from "lodash/capitalize";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Sidebar() {
    const currUser = useCurrentUser();
    const [shortSidebar, setShortSidebar] = useState(true);

    const pathname = usePathname();


    function toggleSidebar() {
        setShortSidebar(!shortSidebar);
    }

    let roleLinks = [
        {
            title: 'Upload Content',
            icon: <p className="relative"><SlScreenDesktop /> <MdOutlineFileUpload className="text-[10px] absolute top-[15%] left-[25%]" /></p>,
            href: '/upload',
        },
        {
            title: 'View Code',
            icon: <CiViewList />,
            href: '/screen-auth',
        }
    ];

    let homePage = "/"

    if (currUser?.role === "ADMIN") {
        homePage = "/admin"
        roleLinks = [
            ...roleLinks,
            {
                title: "Screen Setup",
                icon: <p className="relative"><SlScreenDesktop /> <CiEdit className="text-[10px] absolute top-[15%] left-[20%]" /></p>,
                href: "/admin/screen-setup"
            },
            {
                title: "Add Manager",
                icon: <FaUserCog />,
                href: "/admin/manager-access"
            }
        ]
    } else if (currUser?.role === "SUPER_ADMIN") {
        homePage = "/super-admin"
        roleLinks = [
            {
                title: "Add plants",
                icon: <MdAdminPanelSettings />,
                href: "/super-admin/add-plants"
            },
            {
                title: "Add Admin",
                icon: <FaUserCog />,
                href: "/super-admin/add-admins"
            }
        ];
    }


    return (
        <div className={`flex flex-col h-full transition-all duration-500 transform w-fit ${shortSidebar ? "text-gray-400 border-e" : "bg-[#4285F4] text-slate-200"} px-2 py-4`}>

            <div className={shortSidebar ? "" : "flex justify-between items-start flex-row-reverse"}>
                <section className="flex justify-end">
                    <button onClick={toggleSidebar} className={`border text-xl rounded mb-4 ${shortSidebar ? "text-gray-400" : ""}`}><RiExpandLeftRightLine /></button>
                </section>
                {/* <section className="mb-6- flex flex-col justify-center">
                    <Link href={homePage}>
                        <Image src="/logo.png" width={40} height={40} alt="" className="text-2xl font-bold" />
                    </Link>
                    <p className={shortSidebar ? "hidden" : "my-1"}>{capitalize(currUser?.plantId && typeof currUser?.plantId === "object" ? currUser.plantId.name : "All")} Plant</p>
                </section> */}
            </div>

            <div className="flex-1 flex flex-col justify-between w-full">
                <section className="">
                    {
                        roleLinks &&
                        roleLinks.map((link, index) => {
                            return (
                                <Link key={index} href={link.href} className={`hover:bg-[#5a98fd] hover:text-white ${pathname == link.href ? shortSidebar ? "bg-slate-200" : "bg-[#2a70e1] text-white" : ""} px-3 py-2 rounded-md flex items-center gap-2 text-sm`}>
                                    <span className="text-xl">{link.icon}</span>
                                    <span className={shortSidebar ? "hidden" : ""}>{link.title}</span>
                                </Link>
                            )
                        })
                    }
                </section>
                {/* <section className="">
                    {
                        links2.map((link, index) => {
                            return (
                                <Link key={index} href={link.href} className={`hover:bg-[#5a98fd] hover:text-white ${pathname.includes(link.href) ? shortSidebar ? "bg-slate-200" : "bg-[#2a70e1] text-white" : ""} px-3 py-2 rounded-md flex items-center gap-2 text-sm`}>
                                    <p className="text-2xl">{link.icon}</p>
                                    <span className={shortSidebar ? "hidden" : ""}>{link.title}</span>
                                </Link>
                            )
                        })
                    }
                </section> */}
            </div>
        </div>
    )
}
