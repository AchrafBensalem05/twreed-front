"use client"

import SignupForm from "@/components/auth/signup-form"
import { SignupFormProvider, useSignupForm } from "@/contexts/signup-form-context"

export default function SignupPage() {

  return <SignupFormProvider><SignupForm /></SignupFormProvider>
}