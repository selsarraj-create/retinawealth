import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    // Determine target URL for redirects
    const PUBLIC_PATHS = ['/login', '/signup', '/auth/callback', '/', '/terms', '/dashboard'];
    const isPublic = PUBLIC_PATHS.some(p => request.nextUrl.pathname.startsWith(p));

    // Provide placeholder URL string to bypass type errors during build if .env is missing locally
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

    const supabase = createServerClient(
        supabaseUrl,
        supabaseKey,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Refresh the auth token if needed
    const { data: { user } } = await supabase.auth.getUser();

    // Redirection Guarding
    // If not public route & not authenticated => block access, send to login
    if (!user && !isPublic) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        url.searchParams.set('redirect_to', request.nextUrl.pathname);
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
