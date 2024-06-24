import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shadcomponents/ui/card";
import { Input } from "@/shadcomponents/ui/input";
import { Button } from "@/shadcomponents/ui/button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchemaUsername } from "@/validation/form/form.validation";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shadcomponents/ui/form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "@/api/QueryFunctions";
import { useToast } from "@/shadcomponents/ui/use-toast";

function LoginUsername() {
    document.title='Login with Username'
    const { toast } = useToast();
    interface userData {
      username: string;
      password: string;
    }
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
    resolver: zodResolver(loginFormSchemaUsername),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmitForm = (values: z.infer<typeof loginFormSchemaUsername>) => {
    mutation.mutate(values); // get the form values here
  };
  return (
    <Card className="py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)}>
          <CardHeader>
            <CardTitle>Login with Username</CardTitle>
            <CardDescription>Login with your username and password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormDescription>This is your public display name.</FormDescription>
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
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" type="password" {...field} />
                    </FormControl>
                    <FormDescription>Enter your Password to Login</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full">Login with Username</Button>
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

export default LoginUsername;
