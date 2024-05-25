import { UserNav } from "@/components/UserNav";
import getServerSessionUser from "@/hooks/getServerSessionUser";
import { MdAdminPanelSettings, MdOutlineFileUpload } from "react-icons/md";
import { SlScreenDesktop } from "react-icons/sl";
import { CiViewList, CiEdit } from "react-icons/ci";
import { FaUserCog } from "react-icons/fa";
import Link from "next/link";

export default async function page() {
  const currUser = await getServerSessionUser();

  let roleLinks = [
    {
      title: 'Upload Content',
      icon: <p className="relative"><SlScreenDesktop /> <MdOutlineFileUpload className="text-[2rem] absolute top-[15%] left-[25%]" /></p>,
      href: '/upload',
    },
    {
      title: 'View Code',
      icon: <CiViewList />,
      href: '/screen-auth',
    }
  ];

  if (currUser?.role === "ADMIN") {
    roleLinks = [
      ...roleLinks,
      {
        title: "Screen Setup",
        icon: <p className="relative"><SlScreenDesktop /> <CiEdit className="text-[2rem] absolute top-[15%] left-[20%]" /></p>,
        href: "/admin/screen-setup"
      },
      {
        title: "Add Manager",
        icon: <FaUserCog />,
        href: "/admin/manager-access"
      }
    ]
  } else if (currUser?.role === "SUPER_ADMIN") {
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
    <>
      <div className="shadow p-4 bg-white flex items-center px-4 justify-between">
        <div className="flex-1">
          {/* <h1 className="text-3xl text-center">Home</h1> */}
          <h1 className="text-3xl text-center">Hello, {currUser?.firstName + " " + currUser?.lastName}</h1>
        </div>
        <UserNav />
      </div>
      <div className="m-10 flex justify-center gap-5">
        {
          roleLinks.map((item) => (
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
