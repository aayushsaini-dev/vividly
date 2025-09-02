import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define the routes that are publicly accessible.
// The home page is now the main public landing page.
const isPublicRoute = createRouteMatcher([
  "/",
  "/home",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/signed-out",
]);

// The API for fetching videos for the public home page must also be public.
const isPublicApiRoute = createRouteMatcher(["/api/videos"]);

export default clerkMiddleware(async (auth, req) => {
  // Await the auth() function to correctly get the userId
  const { userId } = await auth();

  // If the route is not public and the user is not signed in,
  // redirect them to the sign-in page using the stable NextResponse method.
  if (!userId && !isPublicRoute(req) && !isPublicApiRoute(req)) {
    const signInUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // If the user is signed in and tries to access an auth page (like sign-in),
  // redirect them to the home page.
  if (
    userId &&
    (req.nextUrl.pathname.startsWith("/sign-in") ||
      req.nextUrl.pathname.startsWith("/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Allow all other requests to proceed.
  return NextResponse.next();
});

export const config = {
  // The matcher must include the root path to handle initial redirects.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
