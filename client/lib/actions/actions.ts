"use server";

import { revalidateTag } from "next/cache";

export default async function refetchByTag(tag: string) {
	revalidateTag(tag);
}

import { redirect } from "next/navigation";

export async function navigate(route: string) {
	redirect(route);
}
