"use client"

import { Button } from "@/components/ui/button"
import { useSignupForm } from "@/contexts/signup-form-context"
import { ArrowLeft } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react";
import { useAuth } from '@/hooks/useAuth';

export function PurposeStep() {
  const { data, setFormData, nextStep, prevStep } = useSignupForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser, setToken } = useAuth();

  const handleRole = (role) => {
    setFormData({ role });
    if (role === "seller") {
      nextStep();
    }
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password,
        role: "client",
        company_name: null,
        company_size: null,
      };
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Registration failed.');
      setUser(result.user || null);
      setToken(result.token || null);
      // Optionally, show a success message or redirect here
    } catch (err) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-lg">
      <Button variant="ghost" className="flex items-center gap-2" onClick={prevStep}>
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">
          {data.username}, your account has been created! What brings you to Twreed?
        </h2>
        <p className="text-sm text-muted-foreground">We want to tailor your experience so you'll feel right at home.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <button
          className={`p-6 border rounded-lg text-left space-y-4 hover:border-orange-500 transition-colors ${data.role === "client" ? "border-orange-500" : ""
            }`}
          onClick={() => handleRole("client")}
          disabled={loading}
        >
          <div className="relative">
            <Checkbox checked={data.role === "client"} className="absolute top-1 right-1 h-4 w-4" />
            <div className="w-16 h-16 bg-slate-900 rounded-lg" />
          </div>
          <div>
            <h3 className="font-semibold">Buying products</h3>
            <p className="text-sm text-muted-foreground">I'm looking to purchase products or make custom requests.</p>
          </div>
        </button>
        <button
          className={`p-6 border rounded-lg text-left space-y-4 hover:border-orange-500 transition-colors ${data.role === "seller" ? "border-orange-500" : ""
            }`}
          onClick={() => handleRole("seller")}
          disabled={loading}
        >
          <div className="relative">
            <Checkbox checked={data.role === "seller"} className="absolute top-1 right-1 h-4 w-4" />
            <div className="w-16 h-16 bg-slate-900 rounded-lg" />
          </div>
          <div>
            <h3 className="font-semibold">Selling / creating products</h3>
            <p className="text-sm text-muted-foreground">I'm offering products or services to buyers.</p>
          </div>
        </button>
      </div>
      {data.role === "client" && (
        <form onSubmit={handleClientSubmit} className="mt-6">
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </form>
      )}
    </div>
  )
}

