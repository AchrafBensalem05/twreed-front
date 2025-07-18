'use client'

import { useState } from "react";
import { AuthMethodStep } from "@/components/steps/auth-method-step";
import { registerUser, validateEmailConfirmation } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignupSidebar } from "@/components/signup-sidebar";
import { useSignupForm } from "@/contexts/signup-form-context";
import { Checkbox } from "../ui/checkbox";
import { EmailVerificationStep } from "../steps/email-verification-step";
import { useAuth } from '@/hooks/useAuth';

const COMPANY_SIZES = [
  { value: "just-me", label: "Just me" },
  { value: "2-10", label: "2 - 10" },
  { value: "11-50", label: "11 - 50" },
  { value: "51-500", label: "51 - 500" },
  { value: "500-plus", label: "500+" },
];

export default function SignupForm({ onSuccess }) {

  const { goToStep, currentStep } = useSignupForm()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "client",
    company_name: "",
    company_size: "",
  });
  const { setUser, setToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e, role) => {
    e.preventDefault();
    console.log("Switching role to:", role);
    setForm((prev) => ({ ...prev, role: role, company_name: "", company_size: "" }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.password,
        role: form.role,
      };
      if (form.role === "seller") {
        payload.company_name = form.company_name;
        payload.company_size = form.company_size;
      }
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed.');
      setUser(data.user || null);
      setToken(data.token || null);
      goToStep("email-verification");
      setSuccess("");
    } catch (err) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <SignupSidebar />

      <main className="flex-1 flex items-center justify-center p-6">
        {currentStep === "auth-method" && <AuthMethodStep onContinue={() => goToStep("email-auth")} />}
        {currentStep === "email-auth" && (
          <form onSubmit={handleRegister} className="space-y-4 w-full max-w-md p-8 rounded">
            <h2 className="text-2xl font-bold mb-4">Create your account</h2>
            <Input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Input
              name="password_confirmation"
              type="password"
              placeholder="Confirm Password"
              value={form.password_confirmation}
              onChange={handleChange}
              required
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div
                className={`p-6 border rounded-lg flex flex-col items-center justify-center space-y-4 hover:border-orange-500 transition-colors ${form.role === "client" ? "border-orange-500" : ""
                  }`}
                onClick={(e) => handleRoleChange(e, "client")}
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-slate-900 rounded-lg" />
                </div>
                <div>
                  <h3 className="font-semibold">Buying products</h3>
                </div>
              </div>
              <div
                className={`p-6 border rounded-lg flex flex-col items-center justify-center space-y-4 hover:border-orange-500 transition-colors ${form.role === "seller" ? "border-orange-500" : ""
                  }`}
                onClick={(e) => handleRoleChange(e, "seller")}
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-slate-900 rounded-lg" />
                </div>
                <div>
                  <h3 className="font-semibold">Selling products</h3>
                </div>
              </div>
            </div>
            {form.role === "seller" && (
              <>
                <Input
                  name="company_name"
                  placeholder="Company Name"
                  value={form.company_name}
                  onChange={handleChange}
                  required
                />
                <select
                  name="company_size"
                  value={form.company_size}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select company size</option>
                  {COMPANY_SIZES.map((size) => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
              </>
            )}
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={loading}>
              {loading ? "Submitting..." : "Register"}
            </Button>
          </form>
        )}
        {currentStep === "email-verification" && (
          <EmailVerificationStep />
        )}
      </main>
    </div>
  );
} 