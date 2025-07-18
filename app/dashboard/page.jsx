"use client"

import { useState, useCallback, useMemo } from "react"
import { Search, Home, Package, Store, LogOut, ChevronLeft, ChevronRight, Menu, Upload, Edit, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockProducts = Array.from({ length: 47 }, (_, i) => ({
    id: i + 1,
    name: "Armoire quatre portes",
    category: "Meuble",
    minPrice: 2000 + i * 50,
    maxPrice: 2400 + i * 50,
    quantity: 150 - i * 2,
    image: `/placeholder.svg?height=200&width=200`,
}))


export default function Component() {
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [sortBy, setSortBy] = useState("price-desc")
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [atelierImages, setAtelierImages] = useState([])
    const [isEditingProfile, setIsEditingProfile] = useState(false)
    const [profileData, setProfileData] = useState({
        name: "Zakhrafa ASH Design",
        subtitle: "Atelier MDF",
    })

    const itemsPerPage = 9

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        const filtered = mockProducts.filter(
            (product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase()),
        )

        switch (sortBy) {
            case "price-asc":
                filtered.sort((a, b) => a.minPrice - b.minPrice)
                break
            case "price-desc":
                filtered.sort((a, b) => b.minPrice - a.minPrice)
                break
            case "orders":
                filtered.sort((a, b) => b.quantity - a.quantity)
                break
            default:
                break
        }

        return filtered
    }, [searchQuery, sortBy])

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
    const paginatedProducts = filteredAndSortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    )



    const handlePageChange = useCallback(
        (page) => {
            setCurrentPage(Math.max(1, Math.min(page, totalPages)))
        },
        [totalPages],
    )

    const handleImageUpload = useCallback((e) => {
        const files = e.target.files
        if (files) {
            const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
            setAtelierImages((prev) => [...prev, ...newImages].slice(0, 8))
        }
    }, [])

    return (

        <main className="flex-1 p-4 lg:p-6">
            {/* Profile Section */}
            <div className="bg-white rounded-lg p-4 lg:p-6 mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Avatar className="w-16 h-16 lg:w-20 lg:h-20">
                        <AvatarFallback className="bg-[#d9d9d9] text-[#667a8a] text-xl lg:text-2xl">Z</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h1 className="text-xl lg:text-2xl font-semibold text-[#000000] mb-1">{profileData.name}</h1>
                        <p className="text-[#667a8a] mb-3">{profileData.subtitle}</p>
                        <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
                            <DialogTrigger asChild>
                                <Button className="bg-[#ff6600] hover:bg-[#e55a00] text-white px-4 py-1 text-sm">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Profile</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium">Name</label>
                                        <Input
                                            value={profileData.name}
                                            onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Subtitle</label>
                                        <Input
                                            value={profileData.subtitle}
                                            onChange={(e) => setProfileData((prev) => ({ ...prev, subtitle: e.target.value }))}
                                        />
                                    </div>
                                    <Button
                                        onClick={() => setIsEditingProfile(false)}
                                        className="w-full bg-[#ff6600] hover:bg-[#e55a00]"
                                    >
                                        Save Changes
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>

            {/* Atelier Pictures */}
            <div className="bg-white rounded-lg p-4 lg:p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                    <h2 className="text-lg lg:text-xl font-semibold text-[#000000]">Atelier pictures</h2>
                    <div className="flex gap-2">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                        />
                        <label htmlFor="image-upload">
                            <Button
                                className="bg-[#ff6600] hover:bg-[#e55a00] text-white px-4 py-1 text-sm cursor-pointer"
                                asChild
                            >
                                <span>
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload
                                </span>
                            </Button>
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {atelierImages.slice(0, 3).map((image, index) => (
                        <div key={index} className="aspect-square bg-[#102935] rounded-lg overflow-hidden">
                            <img
                                src={image || "/placeholder.svg"}
                                alt={`Atelier ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                    {atelierImages.length === 0 && (
                        <>
                            <div className="aspect-square bg-[#102935] rounded-lg"></div>
                            <div className="aspect-square bg-[#102935] rounded-lg"></div>
                            <div className="aspect-square bg-[#102935] rounded-lg"></div>
                        </>
                    )}
                    <div className="aspect-square bg-[#667a8a] rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl lg:text-2xl font-light">
                            +{Math.max(0, atelierImages.length - 3 + 4)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Products */}
            <div className="bg-white rounded-lg p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
                    <h2 className="text-lg lg:text-xl font-semibold text-[#000000]">
                        Produits ({filteredAndSortedProducts.length})
                    </h2>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex items-center gap-4 text-sm text-[#667a8a]">
                            <span>Trier par:</span>
                            <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="relevance">Pertinence</SelectItem>
                                    <SelectItem value="orders">Commandes</SelectItem>
                                    <SelectItem value="price-asc">Prix ↑</SelectItem>
                                    <SelectItem value="price-desc">Prix ↓</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                {paginatedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
                        {paginatedProducts.map((product) => (
                            <div
                                key={product.id}
                                className="border border-[#eef0f1] rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <div className="aspect-square bg-[#102935] relative group">
                                    <img
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name}
                                        className="w-full h-full object-cover opacity-0"
                                        onLoad={(e) => {
                                            e.currentTarget.style.opacity = "1"
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-[#102935] flex items-center justify-center">
                                        <Package className="w-12 h-12 text-white/50" />
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="text-xs text-[#667a8a] mb-1">{product.category}</div>
                                    <h3 className="font-medium text-[#000000] mb-2 line-clamp-2">{product.name}</h3>
                                    <div className="text-xs text-[#667a8a] mb-1">Prix</div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm text-[#000000]">
                                            {product.minPrice}dzd - {product.maxPrice}dzd
                                        </span>
                                        <span className="text-sm text-[#000000]">{product.quantity}</span>
                                    </div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                className="w-full bg-[#ff6600] hover:bg-[#e55a00] text-white py-2"
                                                onClick={() => setSelectedProduct(product)}
                                            >
                                                <Eye className="w-4 h-4 mr-2" />
                                                Details
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>{selectedProduct?.name}</DialogTitle>
                                            </DialogHeader>
                                            {selectedProduct && (
                                                <div className="space-y-4">
                                                    <div className="aspect-square bg-[#102935] rounded-lg"></div>
                                                    <div>
                                                        <p className="text-sm text-[#667a8a]">Category: {selectedProduct.category}</p>
                                                        <p className="text-sm text-[#667a8a]">
                                                            Price: {selectedProduct.minPrice}dzd - {selectedProduct.maxPrice}dzd
                                                        </p>
                                                        <p className="text-sm text-[#667a8a]">Quantity: {selectedProduct.quantity}</p>
                                                    </div>
                                                    <Button className="w-full bg-[#ff6600] hover:bg-[#e55a00]">Contact Seller</Button>
                                                </div>
                                            )}
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Package className="w-16 h-16 text-[#667a8a] mx-auto mb-4" />
                        <p className="text-[#667a8a]">No products found matching your search.</p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-[#667a8a]"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>

                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                const page = i + 1
                                return (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? "default" : "ghost"}
                                        size="sm"
                                        className={currentPage === page ? "bg-[#102935] text-white" : "text-[#667a8a]"}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </Button>
                                )
                            })}

                            {totalPages > 5 && (
                                <>
                                    <span className="text-[#667a8a]">...</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-[#667a8a]"
                                        onClick={() => handlePageChange(totalPages)}
                                    >
                                        {totalPages}
                                    </Button>
                                </>
                            )}

                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-[#667a8a]"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-[#667a8a]">Go to page</span>
                            <Input
                                className="w-16 h-8 text-center"
                                type="number"
                                min="1"
                                max={totalPages}
                                value={currentPage}
                                onChange={(e) => {
                                    const page = Number.parseInt(e.target.value)
                                    if (page >= 1 && page <= totalPages) {
                                        handlePageChange(page)
                                    }
                                }}
                            />
                            <span className="text-sm text-[#667a8a]">of {totalPages}</span>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}
