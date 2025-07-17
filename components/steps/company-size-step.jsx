"use client";

import { Button } from "@/components/ui/button";
import { useSignupForm } from "@/contexts/signup-form-context";
import { ArrowLeft, Building, Building2, Home, Users } from "lucide-react";
import { useState } from "react";
import { registerUser } from "@/app/actions/auth";
import { Input } from "@/components/ui/input";

const COMPANY_SIZES = [
  { value: "just-me", label: "Just me", icon: Home },
  { value: "2-10", label: "2 - 10", icon: Building },
  { value: "11-50", label: "11 - 50", icon: Building2 },
  { value: "51-500", label: "51 - 500", icon: Building },
  { value: "500-plus", label: "500+", icon: Users },
];

export function CompanySizeStep() {
  const { data, setFormData, prevStep } = useSignupForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedSize, setSelectedSize] = useState(data.companySize || null);
  const [companyName, setCompanyName] = useState(data.companyName || "");

  const handleSelect = (size) => {
    setSelectedSize(size);
    setFormData({ companySize: size });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password,
        role: data.role,
      };
      if (data.role === "seller") {
        payload.company_name = companyName;
        payload.company_size = selectedSize;
      }
      await registerUser(payload);
      // Optionally, show a success message or redirect here
    } catch (err) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    setError("");
    setLoading(true);
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password,
        role: data.role,
        company_name: data.companyName,
        company_size: null,
      });
      // Optionally, show a success message or redirect here
    } catch (err) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-lg">
      <div className="flex justify-between items-center">
        <Button variant="ghost" className="flex items-center gap-2" onClick={prevStep}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">How many people work at your company?</h2>
      </div>
      {data.role === "seller" && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Company Name</label>
          <Input
            placeholder="Acme Inc."
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value);
              setFormData({ companyName: e.target.value });
            }}
            required
          />
        </div>
      )}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
        {COMPANY_SIZES.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            className={`p-4 border rounded-lg text-center space-y-2 hover:border-orange-500 transition-colors ${
              selectedSize === value ? "border-orange-500 bg-orange-50" : ""
            }`}
            onClick={() => handleSelect(value)}
            disabled={loading}
            type="button"
          >
            <div className="mx-auto w-12 h-12 flex items-center justify-center">
              <Icon className="w-8 h-8" />
            </div>
            <span className="text-sm font-medium block">{label}</span>
          </button>
        ))}
      </div>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      {selectedSize && (
        <form onSubmit={handleSubmit} className="mt-6">
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={loading || (data.role === 'seller' && !companyName)}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      )}
    </div>
  );
}