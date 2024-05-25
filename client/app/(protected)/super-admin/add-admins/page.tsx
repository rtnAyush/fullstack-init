import { TbFilterX } from "react-icons/tb";
import { UserType } from "@/types";
import { UserNav } from "@/components/UserNav";
import AdminInviteForm from "@/components/superAdmin/adminAccess/AdminInviteForm";
import EditAdmin from "@/components/superAdmin/adminAccess/EditAdmin";



export default async function page() {

    // fetch users
    const users: UserType[] = await fetchUsers();

    async function fetchUsers() {
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/get-admins", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                next: { tags: ['userList'] }
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data ? data.message : "Something went wrong while fetching Users in res!");
            }

            return data;

        } catch (error: any) {
            console.error(error.message);
            throw (error ? error.message : "Something went wrong while fetching Users");
        }
    }


    return (
        <div>
            <div className="shadow p-4 bg-white flex justify-center">
                <h1 className="text-2xl text-center flex-1">Admin Access and Permissions</h1>
                <UserNav />
            </div>

            <div className="flex justify-end items-center m-4">
                <AdminInviteForm />
            </div>

            <div className="h-[98%] m-4 overflow-x-auto shadow-md rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-5 sticky top-0 bg-slate-200">
                        <tr className="text-center">
                            <th className="px-2 whitespace-nowrap">
                                <TbFilterX />
                            </th>
                            <th className="px-2 py-3 whitespace-nowrap  w-[180px]">
                                Name
                            </th>
                            <th className="px-0 py-3 whitespace-nowrap  w-[180px]">
                                Email
                            </th>
                            <th className="px-0 py-3 whitespace-nowrap  w-[180px]">
                                Invite Status
                            </th>
                            <th className="px-0 py-3 whitespace-nowrap  w-[180px]">
                                Role
                            </th>
                            <th className="px-0 py-3 whitespace-nowrap  w-[180px]">
                                Plant Name
                            </th>
                            <th className="px-0 py-3 whitespace-nowrap  w-[180px]">
                                Edit
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={index} className="hover:bg-slate-200 cursor-pointer odd:bg-white even:bg-gray-100 border-b border-gray-100 text-center">
                                    <td className="w-[20px]  px-2 py-4">
                                        {index + 1}
                                    </td>
                                    <td className="w-[180px] px-2 py-4 font-medium text-gray-900">
                                        {user.firstName}
                                    </td>
                                    <td className="w-[180px] px-2 py-4">
                                        {user.email}
                                    </td>
                                    <td className="w-[180px] px-2 py-4">
                                        {user.active ? "Accepted" : "Pending"}
                                    </td>
                                    <td className="w-[180px] px-2 py-4">
                                        {user.role}
                                    </td>
                                    <td className="px-auto py-4 flex justify-center">
                                        <EditAdmin user={user} />
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>

            </div>
        </div>
    )
}