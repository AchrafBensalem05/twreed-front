"use server"

import { customFetch } from "@/lib/fetch"

export async function uploadMedia(data) {
	const res = customFetch("/media/upload-multiple", {
		withAuth:true,
		method: "POST",
		body: data,
	})

	return res
}

export async function removeMedia({ id }) {
	return customFetch(`/media/${id}`, {
		withAuth:true,
		method: "DELETE",
	})
}
