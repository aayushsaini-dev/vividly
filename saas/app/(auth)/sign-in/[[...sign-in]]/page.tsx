import { SignIn } from "@clerk/nextjs";
import { Cloud } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 to-gray-950">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl shadow-indigo-500/10 p-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="bg-indigo-600 p-3 rounded-full mb-4">
            <Cloud className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-100">
            Vividly
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Welcome back, please sign in to continue
          </p>
        </div>

        <SignIn
          afterSignInUrl="/home"
          appearance={{
            // The baseTheme is now global, so we only need to override specific elements if we want.
            elements: {
              card: {
                width: "100%",
                boxShadow: "none",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
