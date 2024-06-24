import {z} from 'zod';

export const loginFormSchemaUsername=z.object({
  username:z.string().min(3,{message:'username must be at least 3 characters'}).max(30,{message:'username cannot be more than 30 characters'}).trim().toLowerCase(),
  password:z.string().min(5,'password must be at least 5 characters').trim()
});
export const loginFormSchemaEmail=z.object({
  email:z.string().email({message:'please enter a valid email address'}).trim(),
  password:z.string().min(5,'password must be at least 5 characters').trim()
});
export const registerFormSchema=z.object({
  username:z.string().min(3,{message:'username must be at least 3 '}).max(30,{message:'username cannot be more than 30'}).trim(),
  email: z
  .string()
  .min(1, { message: "this field must be field" })
  .email({ message: "this is not a valid email address" }).trim(),
firstname: z
  .string()
  .min(1, { message: "this field must be field" })
  .max(100, { message: "this field must not exceed 100 characters" }).trim(),
lastname: z
  .string()
  .min(1, { message: "this field must be field" })
  .max(100, { message: "this field must not exceed 100 characters" }).trim(),
password: z
  .string()
  .min(5, { message: "password must be at least 5 characters " })
  .max(200, { message: "password must not exceed 200 characters" }).trim(),
cpassword: z.string().trim(),
}) .refine((data) => data.password === data.cpassword, {
  message: "confirm password not match with password",
  path: ["cpassword"],
});