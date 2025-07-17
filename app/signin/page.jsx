"use client"

import { SignupSidebar } from "@/components/signup-sidebar"
import { AuthStep } from "@/components/steps/auth-steps"
import { SignupFormProvider } from "@/contexts/signup-form-context"
import { Suspense } from "react"

export default function SignupPage() {
	return (
		<SignupFormProvider>
			<div className="flex min-h-screen">
				<SignupSidebar />
				<main className="flex-1 flex items-center justify-center p-6">
					<Suspense fallback={<div>Loading...</div>}>
						<AuthStep />
					</Suspense>
				</main>
			</div>
		</SignupFormProvider>
	)
}
