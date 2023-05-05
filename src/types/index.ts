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

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IFormErrors {
  username?: string[];
  email?: string[];
  password?: string[];
  non_field_errors?: string[];
}

export interface ITokenTypes {
  refresh: string;
  access: string;
}

export interface Iconnection {
  connection_id: string;
}

export interface ICreateConnection {
  user2_id: string;
}

export interface IconnectionData {
  id: string;
  username: string;
  profile: string;
}

export interface IGetMessages {
  room_id: string;
}

export interface IMessage {
  id: string;
  sender: string;
  message?: string;
  image?: string;
  type: "text" | "image";
  room_id: number;
  created_at: string;
}
