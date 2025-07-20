"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"
import { X, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useFormContext } from "@/contexts/form-context"
import { use } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { MultiSelect } from "../ui/multi-select"
import { FileUpload } from "../file-upload"

const formSchema = z.object({
	productName: z.string().min(2, {
		message: "Product name must be at least 2 characters.",
	}),
	productDescription: z.string(),
	productType: z.array(z.string()).min(1, "At least one product type is required"),
	brandId: z.string().min(1, "Please select a brand"),
	categoryIds: z.array(z.string()).min(1, "Select at least one category"),
	prices: z
		.array(
			z.object({
				price: z.number().min(0),
				quantity: z.number().min(0),
				maximum: z.number().min(0),
			})
		)
		.min(1),
	minPrice: z.number().min(0),
	maxPrice: z.number().min(0),
	images: z.array(z.string()),
})

const productTypes = [
	{ label: "Type 1", value: "type-1" },
	{ label: "Type 2", value: "type-2" },
	{ label: "Type 3", value: "type-3" },
]

export function AddProductForm({ onNext, onPrevious, brandsPromise, categoriesPromise }) {
	const { formState, updateProductInfo } = useFormContext()

	const { data: brands } = brandsPromise ? use(brandsPromise) : { data: [] }
	const { data: categories } = categoriesPromise ? use(categoriesPromise) : { data: [] }

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			productName: "",
			productDescription: "",
			productType: [],
			brandId: "",
			categoryIds: [],
			prices: [{ price: 0, quantity: 0, maximum: 0 }],
			minPrice: 0,
			maxPrice: 0,
			images: [],
			...formState.productInfo,
		},
	})

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "prices",
	})

	function onSubmit(values) {
		updateProductInfo(values)
		onNext()
	}

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-2xl font-semibold mb-2">Add your first product</h1>
				<p className="text-gray-500">Start by adding the details of the first product you want to display in your store.</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FileUpload defaultMedias={form.images} onChange={() => {}} multiple={true} maxFiles={8} uploadText="Upload your media files" uploadSubtext="Images and videos up to 10MB each" />

					<div className="space-y-4">
						<FormField
							control={form.control}
							name="productName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Product name</FormLabel>
									<FormControl>
										<Input placeholder="Enter product name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="productDescription"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Product Description</FormLabel>
									<FormControl>
										<Textarea placeholder="Description here" className="resize-none min-h-[120px]" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="productType"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Product Type</FormLabel>
									<FormControl>
										<MultiSelect value={field.value} onChange={field.onChange} options={productTypes} placeholder="Select product types" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="brandId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Brand</FormLabel>
									<FormControl>
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a brand" />
											</SelectTrigger>
											<SelectContent>
												{brands.map((brand) => (
													<SelectItem key={brand.id} value={brand.id}>
														{brand.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="categoryIds"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Categories</FormLabel>
									<FormControl>
										<MultiSelect
											options={categories}
											value={field.value}
											onChange={field.onChange}
											placeholder="Select your preferred frameworks..."
											searchPlaceholder="Search frameworks..."
											emptyMessage="No frameworks found."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<FormLabel>Product price</FormLabel>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={() => append({ price: 0, quantity: 0, maximum: 0 })}
									className="text-[#FF5C00] hover:text-[#FF5C00]/90 hover:bg-[#FF5C00]/10"
								>
									<Plus className="w-4 h-4 mr-1" />
									Add another price
								</Button>
							</div>
							<div className="space-y-4">
								{fields.map((field, index) => (
									<div key={field.id} className="relative">
										<div className="grid grid-cols-3 gap-4">
											<FormField
												control={form.control}
												name={`prices.${index}.price`}
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<div className="flex items-center space-x-2">
																<span className="text-sm text-gray-500">Price</span>
																<Input type="number" min={0} {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
															</div>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name={`prices.${index}.quantity`}
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<div className="flex items-center space-x-2">
																<span className="text-sm text-gray-500">Quantity</span>
																<Input type="number" min={0} {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
															</div>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name={`prices.${index}.maximum`}
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<div className="flex items-center space-x-2">
																<span className="text-sm text-gray-500">Maximum</span>
																<Input type="number" min={0} {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
															</div>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										{index > 0 && (
											<Button type="button" variant="ghost" size="sm" onClick={() => remove(index)} className="absolute -right-2 -top-2 h-6 w-6 p-0 rounded-full">
												<X className="h-4 w-4" />
											</Button>
										)}
									</div>
								))}
								<div className="grid grid-cols-2 gap-4"></div>
							</div>
						</div>
					</div>

					<div className="flex justify-between pt-8">
						<Button type="button" variant="outline" onClick={onPrevious}>
							Previous
						</Button>
						<div className="flex items-center gap-3">
							<Button type="submit" variant="outline">
								Continue later
							</Button>
							<Button type="submit" className="bg-[#FF5C00] hover:bg-[#FF5C00]/90 px-5 md:px-10">
								Next
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
	)
}
