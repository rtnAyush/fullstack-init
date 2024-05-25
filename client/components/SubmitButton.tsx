'use client'
import { Button } from "@/components/ui/button"
import { useFormStatus } from 'react-dom'

export default function SubmitButton({ disable, className, text }: { text?: string, disable?: boolean, className?: string }) {
    const { pending } = useFormStatus()
    return (
        <Button disabled={pending || disable}>
            {pending ? text ? "Please wait..." : "Submitting..." : text ?? "Submit"}
        </Button>
    )
}