"use server"

import { customFetch } from "@/lib/fetch"

export async function uploadMedia(data) {
	const res = customFetch("/media/upload-multiple", {
		method: "POST",
		body: data,
	})

	return res
}

export async function removeMedia({ id }) {
	return customFetch(`/media/${id}`, {
		method: "DELETE",
	})
}
