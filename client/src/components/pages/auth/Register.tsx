/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/atoms/ui/button";
import { Input } from "@/components/atoms/ui/input";
import { AuthLayout } from "@/components/layouts";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/atoms/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/ui/form";
import { useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import { useAuth, useAxios } from "@/hooks";
import { accessToken, Client } from "@/types";
import { toast } from "sonner";
import { GoogleOAuth } from "@/components/molecules";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(60),
  recall: z.boolean().default(false).optional(),
  name: z.string().min(3).max(60),
});

const Register = () => {
  const { setToken } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      recall: false,
      name: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const res = await useAxios<Client & accessToken>({
      endpoint: "register",
      method: "POST",
      data: values,
      feature: "auth",
    });

    if (res.status === true) {
      setToken(res.data.accessToken);
    } else {
      toast.error("Uh oh! Something went wrong.", {
        description: res.message,
        richColors: true,
        position: "bottom-center",
      });
    }

    setIsLoading(false);
  }

  return (
    <AuthLayout>
      <div className=" flex flex-col w-[350px] xl:w-[360px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="text-balance text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recall"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 text-muted-foreground font-normal text-sm leading-none">
                    <FormLabel>Remember me for 30 days</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? (
                <LuLoader2 className="size-5 animate-spin" />
              ) : (
                "Sign up"
              )}
            </Button>
          </form>

          <GoogleOAuth isSignUp={true} />
        </Form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to={"/login"} className="underline">
            Sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};
export default Register;
