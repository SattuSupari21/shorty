import { userState } from "../atoms/user";
import { selector } from "recoil";
import {urlState} from "@/state/atoms/url";

export const urlLoading = selector({
    key: "urlLoadingState",
    get: ({ get }) => {
        const state = get(urlState);

        return state.isLoading;
    },
});
