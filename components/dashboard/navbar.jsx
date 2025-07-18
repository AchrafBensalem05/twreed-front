"use client"

import Link from "next/link"
import { Check, Globe, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { languages } from "@/lib/constants"
import { MobileNav } from "../mobile-nav"
const dashboardNavItems = [
	{ title: "Overview", href: "/dashboard" },
	{ title: "Orders", href: "/dashboard/orders" },
	{ title: "Products", href: "/dashboard/products" },
	{ title: "Settings", href: "/dashboard/settings" },
	// Add more as needed
]
const Navbar = () => {
	const [currentLanguage, setCurrentLanguage] = useState(languages[0])
	return (
		<header className="sticky top-0 z-50 w-full bg-white h-fit">
			<div className="container flex h-16 items-center justify-b etween px-4 mx-auto gap-2">
				{/* Mobile Sidebar (burger menu) */}
				<div className="md:hidden">
					<MobileNav items={dashboardNavItems} />
				</div>
				<Link href="/" className="mr-6 flex items-center space-x-2">
					<span className="text-xl font-bold text-black">TWREED</span>
				</Link>

				<div className="flex items-center space-x-4 ml-auto">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="sm" className="text-black border-transparent hover:bg-transparent hover:text-black">
								<Globe className="h-4 w-4 mr-2 text-black" />
								{currentLanguage.name}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{languages.map((lang) => (
								<DropdownMenuItem key={lang.code} onClick={() => setCurrentLanguage(lang)}>
									<span>{lang.name}</span>
									{currentLanguage.code === lang.code && <Check className="h-4 w-4 ml-auto" />}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
					<Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary/10 hover:text-primary">
						Get the App
					</Button>
					<Button className="rounded-full bg-primary text-white hover:bg-[#ff5a13]">Login</Button>
				</div>
			</div>
		</header>
	)
}
export default Navbar
