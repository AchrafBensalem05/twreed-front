// app/actions/products.js
"use server"

import { customFetch } from "@/lib/fetch"
import productSchema from "@/schemas/products"

// List all products (with filters if needed)
export async function getAllProducts(query = {}) {
	return await customFetch("/products", {
		method: "GET",
		query,
	})
}

// Get one product
export async function getProduct(id) {
	return await customFetch(`/products/${id}`, {
		method: "GET",
	})
}

// Get products by seller ID
export async function getProductsBySeller(sellerId) {
	return await customFetch(`/sellers/${sellerId}/products`, {
		method: "GET",
	})
}

// Create product (seller only)
export async function createProduct(_, formData) {
	const rawData = {
		name: formData.get("name"),
		description: formData.get("description"),
		type: formData.get("type"),
		brand_id: JSON.parse(formData.get("brand_id")),
		quantity: JSON.parse(formData.get("quantity")),
		category_ids: JSON.parse(formData.get("category_ids")),
		pricings: JSON.parse(formData.get("pricings")),
		images: JSON.parse(formData.get("images")),
	}
	try {
		// Parse the JSON data from the form
		console.log(rawData)
		// Validate with Zod
		const validatedData = productSchema.safeParse(rawData)

		// If validation fails, return errors
		if (!validatedData.success) {
			return {
				inputs: rawData,
				errors: validatedData.error.flatten().fieldErrors,
				success: false,
				message: "Please fix the validation errors below",
			}
		}
		const res = await customFetch("/products", {
			method: "POST",
			body: validatedData.data,
			withAuth: true,
		})
		return {
			inputs: [],
			data: res.data,
			errors: [],
			success: true,
			message: res.data.message ?? "Success",
		}
	} catch (e) {
		console.log(e.message)
		return {
			inputs: rawData,
			errors: [],
			success: false,
			message: e.message ?? "Unexpected Error",
		}
	}
}

export async function getMyProducts({ query }) {
	const res = await customFetch("/products/me", {
		method: "GET",
		withAuth: true,
		query,
	})
	return res
}
