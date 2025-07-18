import { getMyProducts } from "@/app/actions/products"
import { AddProductForm } from "@/components/onboarding/add-product-form"
import { FormProvider } from "@/contexts/form-context"

export default async function ProductsPage({ searchParams }) {
	const getProducts = async () => {
		const params = await searchParams
		const query = new URLSearchParams(params).toString()
		const res = await getMyProducts({ query })

		return res
	}

	const { data: products } = await getProducts()

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">My Products</h1>

			{products.length === 0 ? (
				<FormProvider>
					<AddProductForm />
				</FormProvider>
			) : (
				<ul className="space-y-2">
					{products.map((product) => (
						<li key={product.id} className="p-4 border rounded">
							<strong>{product.name}</strong> — ${product.price}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
