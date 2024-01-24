'use server'

import axios from "axios";
import {cookies} from "next/headers";

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
        cookies().set('auth', res.data)
        return res.data;
    });
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

export async function createShortUrl(longUrl: string) {
    const {data} = await axios.post('http://localhost:3049/api/url/createUrl', {
            longUrl
        }, {
            headers: {
                Cookie: cookies().toString()
            },
            withCredentials: true
        }
    )
    return data;
}