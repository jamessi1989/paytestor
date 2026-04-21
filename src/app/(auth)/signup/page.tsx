import { redirect } from "next/navigation";

// Signup is the same flow as login — OAuth creates the account on first
// sign-in. Redirect keeps any /signup links working.
export default function SignupPage() {
  redirect("/login");
}
