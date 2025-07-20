// lib/fetch.js

import { cookies } from "next/headers"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export async function customFetch(endpoint, { method = "GET", query = {}, body = null, headers = {}, withAuth = false, token = null, cache = "no-store", next = null, signal = null } = {}) {
	// Build query string
	const queryString = Object.entries(query)
		.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
		.join("&")

	const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ""}`

	const defaultHeaders = {
		Accept: "application/json",
	}

	// Add Authorization if needed
	if (withAuth) {
		const cookieStore = await cookies()
		const finalToken = token || cookieStore.get("token")?.value
		if (finalToken) {
			defaultHeaders["Authorization"] = `Bearer ${finalToken}`
		}
	}

	const options = {
		method,
		headers: {
			...defaultHeaders,
			...headers,
		},
		cache,
		signal,
	}

	if (body) {
		if (body instanceof FormData) {
			options.body = body
		} else {
			options.body = JSON.stringify(body)
			options.headers["Content-Type"] = "application/json"
		}
	}

	if (next !== null) {
		options.next = { revalidate: next }
	}

	try {
		const res = await fetch(url, options)
		if (!res.ok) {
			const errData = await parseResponse(res)
			const error = new Error(errData?.message || res.statusText)
			error.status = res.status
			error.data = errData

			throw error
		}

		return await parseResponse(res)
	} catch (error) {
		console.error(`[customFetch] ${method} ${url} →`, error)
		throw error
	}
}

async function parseResponse(res) {
	const contentType = res.headers.get("content-type")
	if (contentType && contentType.includes("application/json")) {
		return await res.json()
	}
	return await res.text()
}
