import { NextResponse, NextRequest } from 'next/server'
import { useUser } from '../hooks/authUser'

export async function middleware(request, ev) {
    const url = request.nextUrl.clone()
    if (url.pathname == '/admin') {
        url.pathname = '/admin/dashboard'
        return NextResponse.redirect(url)
    }
    return NextResponse.next()
}
