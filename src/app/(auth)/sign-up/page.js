"use client";


import { signUp } from "@/app/lib/auth.client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

export default function SignUpPage() {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const { data: SignUpData, error } = await signUp.email({
    name: data.name, // required, The name of the user.
    email: data.email, // required, The email address of the user.
    password: data.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
    callbackURL: "/", // An optional URL to redirect to after the user signs up. homepage by default. 
});

    // Add your signup API call here.
    console.log("Form Data:", SignUpData, error);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <Form
        className="flex w-full max-w-sm flex-col gap-4"
        onSubmit={onSubmit}
      >
        <h1 className="text-center text-2xl font-bold">
          Create an Account
        </h1>

         <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>

        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }

            return null;
          }}
        >
          <Label>Email</Label>
          <Input
            placeholder="Enter your email address"
            autoComplete="email"
          />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }

            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }

            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }

            return null;
          }}
        >
          <Label>Password</Label>
          <Input
            placeholder="Enter your password"
            autoComplete="new-password"
          />
          <Description>
            Must be at least 8 characters with 1 uppercase letter and 1 number.
          </Description>
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button type="submit">
    
            Sign Up
          </Button>

          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}