import { atom } from "recoil";
import { getLatestPostId } from "../hooks/useFirestore";

export const postState = atom({
    key: 'postState',
    default: getLatestPostId()
})