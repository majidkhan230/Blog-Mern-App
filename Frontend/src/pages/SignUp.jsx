import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom";

function SignUp() {
  const formSchema = z.object({
    username:z.string().min(3,"name must be 3 character long").max(50),
    email: z.string().email(),
    password: z.string().min(8, "password must be atleast 8 character long"),
    confirmPassword:z.string().refine(data.password === data.confirmPassword,'password and confirm password should be same')
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username:"",
      email: "",
      password: "",
      confirmPassword:""
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="w-full h-screen  flex justify-center items-center ">
    <Card className="w-[410px]">
  <CardHeader >
    <CardTitle className='text-2xl text-center'>Sign Up</CardTitle>
    <CardDescription className='text-center'>Please Enter your username,email and password </CardDescription>
  </CardHeader>
  <CardContent>
  <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mb-1">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="please enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="abc@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-1">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="please enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-1">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="please enter confirm password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="text-center">
          <Button  type="submit">Sign up</Button>
          <div className="mt-2">
            Already have an account? <Link to={'/sign-in'}>Sign up</Link>
          </div>
          </div>
        </form>
      </Form>
  </CardContent>
  
</Card>

    </div>
  );
}

export default SignUp;
