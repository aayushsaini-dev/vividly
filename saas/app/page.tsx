import { redirect } from "next/navigation";

export default function RootPage() {
  // This page's only job is to redirect all traffic to the public home page.
  // The middleware will then protect other routes as needed.
  redirect("/home");

  // This fallback UI is technically unreachable but good practice to have.
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-950">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
    </div>
  );
}
