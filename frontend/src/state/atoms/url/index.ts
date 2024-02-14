"use client"

import { atom } from "recoil";
export const urlState = atom({
    key: 'urlState', // unique ID (with respect to other atoms/selectors)
    default: {
        urls: [],
        isLoading: true
    }
});

