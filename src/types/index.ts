import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  inputId: string;
  register?: any;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  otherClasses?: string;
}

export interface NewUser {
  username: string;
  email: string;
  password: string;
}
