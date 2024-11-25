"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  username: z.string().min(6, {
    message: "Please enter a valid email usernmae",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      console.log("Registration successful:", data);

      router.push("/login");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during registration"
      );
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="border border-gray-800 p-8 rounded-xl w-96 bg-gray-900/50 backdrop-blur-sm shadow-xl">
        <h1 className="text-4xl text-white font-bold mb-2 tracking-tight">
          Sign Up
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Get started! Please enter your details.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200 text-sm">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200 text-sm">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      {...field}
                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200 text-sm">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 mt-2"
            >
              Sign up
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
