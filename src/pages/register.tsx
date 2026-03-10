"use client";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

import { register } from "@/src/api/authService";
import { useAuth } from "@/src/context/authContext";


export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
   e.preventDefault();

  try {
    const response = await register({
      username: name,
      email: email,
      password: password,
    });

    // if backend returns token after register:
    login(response.token);

    navigate("/");
  } catch (err) {
    console.error(err);
    alert("Registration failed");
  }
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-foreground">
              <span className="text-lg font-bold text-card">B</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Create an account
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Get started with BudgetTrack for free.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="regName" className="text-foreground text-sm">
                Username
              </Label>
              <Input
                id="regName"
                placeholder="James Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-border bg-card text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="regEmail" className="text-foreground text-sm">
                Email
              </Label>
              <Input
                id="regEmail"
                type="email"
                placeholder="james@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-border bg-card text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="regPassword" className="text-foreground text-sm">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="regPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-border bg-card pr-10 text-foreground placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="mt-2 bg-foreground text-card hover:bg-foreground/90 font-semibold"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-olive hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden flex-1 lg:flex relative overflow-hidden">
        <img
          src="/images/auth-hero.jpg"
          alt="Financial dashboard illustration with charts and budget tracking"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-olive/60" />
        <div className="relative z-10 flex flex-col items-center justify-end w-full pb-16 px-12">
          <div className="text-center max-w-sm">
            <h2 className="text-2xl font-bold text-white">
              Start your financial journey
            </h2>
            <p className="mt-3 text-sm text-white/80 leading-relaxed">
              Join thousands of users building better money habits with
              BudgetTrack.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
