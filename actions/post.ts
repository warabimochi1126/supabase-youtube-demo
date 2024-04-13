"use server";

import { createClient } from "@/lib/supabase/server";

export const createPost = async (data: FormData) => {
    const body = data.get("body") as string;

    const supabase = createClient();

    // supabase.auth.getUser() で ユーザ取得
    const { data: { user } } = await supabase.auth.getUser();

    if(!body) {
        throw new Error("Body is required");
    }
    if(!user) { 
        // エラーが投げられるとそれ以降の処理は走らない
        throw new Error("Unauthorized");
    }

    // サーバ側で認証情報を取得して使うのが定石
    return supabase.from("posts").insert({
        body,
        userId: user.id
    });
}

export const updatePost = async (data: FormData) => {
    const id = data.get("id") as string;
    const body = data.get("body") as string;

    const supabase = createClient();

    // supabase.auth.getUser() で ユーザ取得
    const { data: { user } } = await supabase.auth.getUser();


    if(!body) {
        throw new Error("Body is required");
    }
    if(!user) { 
        // エラーが投げられるとそれ以降の処理は走らない
        throw new Error("Unauthorized");
    }

    // サーバ側で認証情報を取得して使うのが定石
    return supabase.from("posts").update({
        body,
        userId: user.id
    }).eq("id", id); 
}

export const deletePost = async (id: number) => {
    const supabase = createClient();

    // supabase.auth.getUser() で ユーザ取得
    const { data: { user } } = await supabase.auth.getUser();

    if(!user) { 
        // エラーが投げられるとそれ以降の処理は走らない
        throw new Error("Unauthorized");
    }

    // サーバ側で認証情報を取得して使うのが定石
    return supabase.from("posts").delete().eq("id", id);
}