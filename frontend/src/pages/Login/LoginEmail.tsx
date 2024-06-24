import { Card, CardFooter, CardHeader, CardDescription, CardTitle, CardContent } from "@/shadcomponents/ui/card";
import { Input } from "@/shadcomponents/ui/input";
import { Button } from "@/shadcomponents/ui/button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shadcomponents/ui/form";
import { loginFormSchemaEmail } from "@/validation/form/form.validation";
import { postLogin } from "@/api/QueryFunctions";
import { useToast } from "@/shadcomponents/ui/use-toast";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
function LoginEmail() {
  const { toast } = useToast();
  interface userData {
    email: string;
    password: string;
  }
  document.title = "Login with Email";
  const mutation = useMutation<{ status: string; message: string }, userData, userData>({
    mutationFn: (data) => postLogin(data),
    onSuccess: (data, variables, context) => {
      console.log(data);
      toast({
        title: data.status,
        description: data.message,
      });
    },
  });
  const form = useForm({
    resolver: zodResolver(loginFormSchemaEmail),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmitForm = (values: z.infer<typeof loginFormSchemaEmail>) => {
    mutation.mutate(values);
  };

  return (
    <Card className="py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)}>
          <CardHeader>
            <CardTitle>Login with Email</CardTitle>
            <CardDescription>Login with your email and password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email address " {...field} />
                    </FormControl>
                    <FormDescription>This is your email address which you have entered on registration.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormDescription>Enter your Password to Login</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full">Login with Email</Button>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="underline">
                Register
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

export default LoginEmail;
