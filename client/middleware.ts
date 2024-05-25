import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	// async function middleware(request: NextRequestWithAuth) {
	// 	if (
	// 		request.nextUrl.pathname.startsWith("/super-admin") &&
	// 		request.nextauth.token?.role !== "SUPER_ADMIN"
	// 	) {
	// 		return NextResponse.rewrite(new URL("/denied", request.url));
	// 	}

	// 	if (
	// 		request.nextUrl.pathname.startsWith("/admin") &&
	// 		request.nextauth.token?.role !== "ADMIN"
	// 	) {
	// 		return NextResponse.rewrite(new URL("/denied", request.url));
	// 	}
	// },
	// {
	// 	callbacks: {
	// 		authorized: ({ token }) => !!token,
	// 	},
	// }
);

// export const config = { matcher: ["/dashboard(.*)"] };
// export const config = {
// 	// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// 	matcher: [
// 		"/((?!api|_next/static|_next/image|favicon.ico|login|screen/*).*)",
// 	],
// };
