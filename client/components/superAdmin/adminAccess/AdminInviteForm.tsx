"use client"
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import refetchByTag from "@/lib/actions/actions";
import { capitalize } from "lodash";
import { useState } from "react";
import { useFormState } from "react-dom";



export default function AdminInviteForm() {
    const [open, setOpen] = useState(false);
    const [message, clientAction] = useFormState(submitInvite, undefined);

    async function submitInvite(prevState: any, formData: FormData) {

        const newUser = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            active: formData.get("active") === "true" ? true : false,
            plantId: formData.get("plantId")
        }

        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users/create-admin', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();
        if (!res.ok) {
            return {
                message: data ? data.message : "Something went wrong",
            }
        }
        setOpen(false);
        refetchByTag("userList")
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Send Admin Invite</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Send Admin Invite</DialogTitle>
                    <DialogDescription>
                        Send invite link form here. Click send when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <form action={clientAction} className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="firstName" className="text-right">
                            First Name
                        </Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="lastName" className="text-right">
                            Last Name
                        </Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">
                            Phone
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            className="col-span-3"
                            placeholder="123-456-7890"
                            required
                        />
                    </div>

                    {/* <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right whitespace-nowrap">
                            Select Plant
                        </Label>
                        <Select name="plantId">
                            <SelectTrigger className="col-span-3 py-4">
                                <SelectValue placeholder="Select Plant" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    plants.map((plant, index) => (
                                        <SelectItem key={index} value={plant._id}>{capitalize(plant.name)}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div> */}

                    <div className="flex justify-between">
                        <DialogTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogTrigger>
                        <SubmitButton />
                    </div>
                </form>
                {message && (
                    <div className='flex gap-4 p-4 mt-6 bg-red-200 rounded-sm'>
                        <p className="text-sm text-red-500">{message.message}</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
