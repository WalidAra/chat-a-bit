/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/atoms/ui/button";
import { Input } from "@/components/atoms/ui/input";
import { Label } from "@/components/atoms/ui/label";
import { AuthLayout } from "@/components/layouts";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Checkbox } from "@/components/atoms/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/ui/form";
import { useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import { useAxios } from "@/hooks";
import { accessToken, Client } from "@/types";
import { TOKEN_KEY } from "@/config";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(60),
  recall: z.boolean().default(false).optional(),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      recall: false,
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const res = await useAxios<Client & accessToken>({
      endpoint: "login",
      method: "POST",
      body: values,
      feature: "auth",
    });

    if (res.status === true) {
      localStorage.setItem(TOKEN_KEY, res.data.accessToken);
      window.location.reload();
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
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
                  <FormLabel>
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to={"/"}
                        className="ml-auto text-foreground inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </FormLabel>
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
                "Sign in"
              )}
            </Button>
          </form>

          <Button
            variant="outline"
            className="w-full mt-4 items-center flex gap-2"
          >
            <FcGoogle className="size-5" />
            Login with Google
          </Button>
        </Form>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to={"/register"} className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
