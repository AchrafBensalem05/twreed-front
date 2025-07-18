"use server"
import { customFetch } from "@/lib/fetch"

export async function registerUser(data) {
	return await customFetch("/auth/register", {
		method: "POST",
		body: data,
	})
}

export async function getCurrentUser(cookies = null, token = null) {
	return await customFetch("/auth/me", {
		method: "GET",
		withAuth: true,
		cookies,
		token,
	})
}

export async function sendEmailConfirmation() {
	// Send confirmation email
	return await customFetch("/auth/send-confirmation-code", {
		method: "POST",
		withAuth: true,
	})
}

export async function validateEmailConfirmation({ otp }) {
	return await customFetch("/auth/verify-code", {
		method: "POST",
		withAuth: true,
		body: { code: otp },
	})
}
