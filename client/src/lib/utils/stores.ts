import { writable } from "svelte/store";
import { browser } from "$app/env";



const storedUser = undefined;
export const userStore = writable(storedUser?JSON.parse(storedUser):undefined);
if (browser){
    userStore.set(localStorage.getItem("userStore"));
    userStore.subscribe(value => {
        localStorage.setItem("userStore", JSON.stringify(value));
    });
}