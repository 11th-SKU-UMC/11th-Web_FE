import { mutationOptions } from "@tanstack/react-query";
import { login } from "./login";
import { signup } from "../members/signup";

export const loginMutationOptions = () => mutationOptions({
  mutationKey: ["auth", "login"],
  mutationFn: login,
});

export const signupMutationOptions = () => mutationOptions({
  mutationKey: ["auth", "signup"],
  mutationFn: signup,
});
