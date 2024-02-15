'use server'

import axios from "axios";
import { cookies } from "next/headers";

export async function getUserData() {
    const { data } = await axios.get('http://localhost:3049/api/user', {
        headers: {
            Cookie: cookies().toString()
        },
        withCredentials: true
    }
    )
    return data;
}

export async function getUserUrls(userId: number) {
    const { data } = await axios.post('http://localhost:3049/api/url/getUserUrls', {
        id: userId,
    }, {
        headers: {
            Cookie: cookies().toString()
        },
        withCredentials: true,
    }
    )
    return data;
}

export async function loginUser({ email, password }: { email: string, password: string }) {
    if (!email) {
        if (!password) {
            return { status: 'error', error: "Email and password cannot be empty" }
        }
        return { status: 'error', error: "Email cannot be empty" }
    } else if (!password) {
        return { status: 'error', error: "Password cannot be empty" }
    }

    const { data } = await axios.post('http://localhost:3049/api/user/login', {
        email,
        password
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
    });
    if (data.status !== "error") {
        cookies().set('auth', data.token)
        return data;
    }
    return data;
}

export async function logoutUser() {
    cookies().set('auth', '')
    return { status: 'success' }
}

export async function signupUser({ name, email, password }: { name: string, email: string, password: string }) {
    /*let error = [];
    if (!email) {
        error.push("Email cannot be empty")
    }
    if (!name) {
        error.push("Name cannot be empty")
    }
    if (!password) {
        error.push("Password cannot be empty")
    }
    if (error.length > 0) return { status: 'error', error };*/

    const { data } = await axios.post('http://localhost:3049/api/user/signup', {
        name,
        email,
        password
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
    }
    )
    if (data.status === 'success') {
        cookies().set('auth', data.token)
    }
    return data;
}

export async function createShortUrl(longUrl: string, key: string) {
    if (!longUrl) {
        return { status: 'error', error: 'Long url cannot be empty' }
    }

    const { data } = await axios.post('http://localhost:3049/api/url/createUrl', {
        longUrl,
        key
    }, {
        headers: {
            Cookie: cookies().toString()
        },
        withCredentials: true
    })
    return data;
}
