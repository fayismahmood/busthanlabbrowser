import Surreal from 'surrealdb.js';
export const db:Surreal = new Surreal('http://localhost:8000/rpc');

import { writable } from 'svelte/store';

export const log = writable<{logged:boolean,user:any,perm:any}>({
    logged:false,
    user:{},
    perm:[]
});



