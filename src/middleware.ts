import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

// Initialize the next-intl middleware handler
const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest): NextResponse {
  // 1. Run next-intl first to handle locale detection, redirects, and cookies
  const response = handleI18nRouting(request);

  const host = request.headers.get("host");
  const targetSubdomain = "startupjobs.behavera.com"; 

  // 2. Intercept requests coming from your subdomain (or localhost for testing)
  if (host === targetSubdomain || host === "startupjobs.localhost:3000") {
    
    // next-intl communicates internal routing via the 'x-middleware-rewrite' header
    const rewriteHeader = response.headers.get("x-middleware-rewrite");

    if (rewriteHeader) {
      const rewrittenUrl = new URL(rewriteHeader);
      // pathSegments will look like ['en'] or ['en', 'about']
      const pathSegments = rewrittenUrl.pathname.split("/").filter(Boolean);
      
      const locale = pathSegments[0]; // next-intl always puts the locale first internally
      const rest = pathSegments.slice(1); 

      if (locale) {
        // 3. Inject your subpage folder path directly after the locale segment
        const newPathname = `/${locale}/startupjobs${rest.length ? "/" + rest.join("/") : ""}`;
        
        // Return a new internal rewrite while preserving next-intl's headers/cookies
        return NextResponse.rewrite(new URL(newPathname, request.url), {
          headers: response.headers,
        });
      }
    }
  }

  // Fallback to standard next-intl response for the main domain
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
