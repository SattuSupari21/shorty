'use server'

import axios from "axios";
import {cookies} from "next/headers";

export async function getUserData() {
    const {data} = await axios.get('http://localhost:3049/api/user', {
            headers: {
                Cookie: cookies().toString()
            },
            withCredentials: true
        }
    )
    return data;
}

export async function getUserUrls(userId: number) {
    const {data} = await axios.post('http://localhost:3049/api/url/getUserUrls', {
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

export async function loginUser({ email, password}: {email: string, password: string}) {
    return await axios.post('http://localhost:3049/api/user/login', {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        withCredentials: true,
        }
    ).then((res) => {
        cookies().set('auth', res.data.token)
        return res.data;
    });
}

export async function logoutUser() {
    cookies().delete('auth')
}

export async function signupUser({ name, email, password}: {name: string, email: string, password: string}) {
    const {data} = await axios.post('http://localhost:3049/api/user/signup', {
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
    return data;
}

export async function createShortUrl(longUrl: string, key: string) {
    const {data} = await axios.post('http://localhost:3049/api/url/createUrl', {
            longUrl,
            key
        }, {
            headers: {
                Cookie: cookies().toString()
            },
            withCredentials: true
        }
    )
    return data;
}