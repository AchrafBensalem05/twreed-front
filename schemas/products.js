import { z } from "zod";

 const productSchema =  z.object({
    name: z.string().min(2, {
        message: "Product name must be at least 2 characters.",
    }),
    description: z.string(),
    type: z.string().min(1, "At least one product type is required"),
    brand_id: z.number().min(1, "Please select a brand"),
    category_ids: z.array(z.number()).min(1, "Select at least one category"),
    quantity: z.number().min(1, "Enter Quantity"),
    pricings: z
        .array(
            z.object({
                price: z.number().min(0),
                max_quantity: z.number().min(0),
                min_quantity: z.number().min(0),
                discount: z.number().min(0),
            })
        )
        .min(1),
    images: z.array(z.number()),
})
export default productSchema