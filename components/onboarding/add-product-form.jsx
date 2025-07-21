"use client"

import { X, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { use, useActionState, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { MultiSelect } from "../ui/multi-select"
import { FileUpload } from "../file-upload"
import { createProduct } from "@/app/actions/products"
import { Label } from "../ui/label"

const types = [
	{ label: "Product", value: "product" },
	{ label: "Service", value: "service" },
]

export function AddProductForm({ brandsPromise, categoriesPromise }) {
	const { data: brands } = brandsPromise ? use(brandsPromise) : { data: [] }
	const { data: categories } = categoriesPromise ? use(categoriesPromise) : { data: [] }

	const [state, formAction, isPending] = useActionState(createProduct, {
		success: false,
		message: "",
		inputs: {
			name: "",
			description: "",
			type: "",
			quantity: 0,
			brand_id: "",
			category_ids: [],
			pricings: [{ price: 0, discount: 0, min_quantity: 0, max_quantity: 0 }],
			images: [],
		},
	})

	// Local state for dynamic pricing fields
	const [pricings, setPricings] = useState([{ price: 0, discount: 0, min_quantity: 0, max_quantity: 0 }])

	// Local state for images
	const [images, setImages] = useState([])

	// Local state for selected categories
	const [selectedCategories, setSelectedCategories] = useState([])

	const addPricing = () => {
		setPricings([...pricings, { price: 0, discount: 0, min_quantity: 0, max_quantity: 0 }])
	}

	const removePricing = (index) => {
		if (pricings.length > 1) {
			setPricings(pricings.filter((_, i) => i !== index))
		}
	}

	const updatePricing = (index, field, value) => {
		const newPricings = [...pricings]
		newPricings[index] = { ...newPricings[index], [field]: Number(value) || 0 }
		setPricings(newPricings)
	}

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-2xl font-semibold mb-2">Add your first product</h1>
				<p className="text-gray-500">Start by adding the details of the first product you want to display in your store.</p>
			</div>

			<form action={formAction} className="space-y-8">
				<input type="hidden" name="category_ids" value={JSON.stringify(selectedCategories)} />
				<input type="hidden" name="pricings" value={JSON.stringify(pricings)} />
				<input type="hidden" name="images" value={JSON.stringify(images.map((img) => img.id))} />
				<FileUpload defaultMedias={images} onChange={setImages} multiple={true} maxFiles={8} uploadText="Upload your media files" uploadSubtext="Images and videos up to 10MB each" />

				<div className="space-y-4">
					{/* Product Name */}
					<div className="space-y-2">
						<Label htmlFor="name">Product name</Label>
						<Input
							id="name"
							name="name"
							placeholder="Enter product name"
							defaultValue={state.inputs?.name || ""}
							disabled={isPending}
							className={state.errors?.name ? "border-red-500" : ""}
						/>
						{state.errors?.name && (
							<div className="text-red-600 text-sm">
								{state.errors.name.map((error, index) => (
									<div key={index}>• {error}</div>
								))}
							</div>
						)}
					</div>

					{/* Product Description */}
					<div className="space-y-2">
						<Label htmlFor="description">Product Description</Label>
						<Textarea
							id="description"
							name="description"
							placeholder="Description here"
							className={`resize-none min-h-[120px] ${state.errors?.description ? "border-red-500" : ""}`}
							defaultValue={state.inputs?.description || ""}
							disabled={isPending}
						/>
						{state.errors?.description && (
							<div className="text-red-600 text-sm">
								{state.errors.description.map((error, index) => (
									<div key={index}>• {error}</div>
								))}
							</div>
						)}
					</div>

					{/* Product Type */}
					<div className="space-y-2">
						<Label>Product Type</Label>
						<Select name="type" defaultValue={state.inputs?.type || ""} disabled={isPending}>
							<SelectTrigger className={`w-full ${state.errors?.type ? "border-red-500" : ""}`}>
								<SelectValue placeholder="Select a product type" />
							</SelectTrigger>
							<SelectContent>
								{types?.map((type) => (
									<SelectItem key={type.value} value={type.value}>
										{type.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{state.errors?.type && (
							<div className="text-red-600 text-sm">
								{state.errors.type.map((error, index) => (
									<div key={index}>• {error}</div>
								))}
							</div>
						)}
					</div>

					{/* Brand */}
					<div className="space-y-2">
						<Label>Brand</Label>
						<Select name="brand_id" defaultValue={state.inputs?.brand_id || ""} disabled={isPending}>
							<SelectTrigger className={`w-full ${state.errors?.brand_id ? "border-red-500" : ""}`}>
								<SelectValue placeholder="Select a brand" />
							</SelectTrigger>
							<SelectContent>
								{brands?.map((brand) => (
									<SelectItem key={brand.id} value={brand.id.toString()}>
										{brand.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{state.errors?.brand_id && (
							<div className="text-red-600 text-sm">
								{state.errors.brand_id.map((error, index) => (
									<div key={index}>• {error}</div>
								))}
							</div>
						)}
					</div>

					{/* Categories */}
					<div className="space-y-2">
						<Label>Categories</Label>
						<MultiSelect
							options={categories.map((cat) => ({ label: cat.name, value: cat.id }))}
							value={selectedCategories}
							onChange={setSelectedCategories}
							placeholder="Select categories..."
							searchPlaceholder="Search categories..."
							emptyMessage="No categories found."
							disabled={isPending}
						/>
						{state.errors?.category_ids && (
							<div className="text-red-600 text-sm">
								{state.errors.category_ids.map((error, index) => (
									<div key={index}>• {error}</div>
								))}
							</div>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="quantity">Product quantity</Label>
						<Input
							id="quantity"
							name="quantity"
							type="number"
							placeholder="Enter product quantity"
							defaultValue={state.inputs?.quantity || ""}
							disabled={isPending}
							className={state.errors?.quantity ? "border-red-500" : ""}
						/>
						{state.errors?.quantity && (
							<div className="text-red-600 text-sm">
								{state.errors.quantity.map((error, index) => (
									<div key={index}>• {error}</div>
								))}
							</div>
						)}
					</div>
					{/* Pricing */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<Label>Product price</Label>
							<Button type="button" variant="ghost" size="sm" onClick={addPricing} disabled={isPending} className="text-[#FF5C00] hover:text-[#FF5C00]/90 hover:bg-[#FF5C00]/10">
								<Plus className="w-4 h-4 mr-1" />
								Add another price
							</Button>
						</div>
						<div className="space-y-4">
							{pricings.map((pricing, index) => (
								<div key={index} className="relative">
									<div className="grid grid-cols-4 gap-4">
										<div className="space-y-2">
											<div className="flex items-center space-x-2">
												<span className="text-sm text-gray-500">Price</span>
												<Input type="number" min={0} value={pricing.price} onChange={(e) => updatePricing(index, "price", e.target.value)} disabled={isPending} />
											</div>
										</div>
										<div className="space-y-2">
											<div className="flex items-center space-x-2">
												<span className="text-sm text-gray-500">Discount</span>
												<Input
													type="number"
													min={0}
													max={100}
													value={pricing.discount}
													onChange={(e) => updatePricing(index, "discount", e.target.value)}
													disabled={isPending}
												/>
											</div>
										</div>
										<div className="space-y-2">
											<div className="flex items-center space-x-2">
												<span className="text-sm text-gray-500">Min Quantity</span>
												<Input type="number" min={0} value={pricing.min_quantity} onChange={(e) => updatePricing(index, "min_quantity", e.target.value)} disabled={isPending} />
											</div>
										</div>
										<div className="space-y-2">
											<div className="flex items-center space-x-2">
												<span className="text-sm text-gray-500">Max Quantity</span>
												<Input type="number" min={0} value={pricing.max_quantity} onChange={(e) => updatePricing(index, "max_quantity", e.target.value)} disabled={isPending} />
											</div>
										</div>
									</div>
									{index > 0 && (
										<Button
											type="button"
											variant="ghost"
											size="sm"
											onClick={() => removePricing(index)}
											disabled={isPending}
											className="absolute -right-2 -top-2 h-6 w-6 p-0 rounded-full"
										>
											<X className="h-4 w-4" />
										</Button>
									)}
								</div>
							))}
						</div>
						{state.errors?.pricings && (
							<div className="text-red-600 text-sm">
								{state.errors.pricings.map((error, index) => (
									<div key={index}>• {error}</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Form-level errors */}
				{state.errors?._form && (
					<div className="text-red-600 text-sm">
						{state.errors._form.map((error, index) => (
							<div key={index}>• {error}</div>
						))}
					</div>
				)}

				{/* General message */}
				{state.message && <div className={`text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>{state.message}</div>}

				{/* Success data display */}
				{state.success && state.data && (
					<div className="bg-green-50 border border-green-200 rounded-md p-3 text-sm">
						<div className="font-medium text-green-800">Product Created Successfully!</div>
						<div className="text-green-700 mt-1">
							<div>Product ID: {state.data.id}</div>
							<div>Created: {new Date(state.data.createdAt).toLocaleString()}</div>
						</div>
					</div>
				)}

				<div className="flex justify-between pt-8">
					<div className="flex items-center gap-3">
						<Button type="submit" variant="outline" disabled={isPending}>
							{isPending ? "Saving..." : "Continue later"}
						</Button>
						<Button type="submit" disabled={isPending} className="bg-[#FF5C00] hover:bg-[#FF5C00]/90 px-5 md:px-10">
							{isPending ? "Creating..." : "Next"}
						</Button>
					</div>
				</div>
			</form>
		</div>
	)
}
