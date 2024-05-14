import supabase from "./supabase";

export interface LoginProps {
    email: string;
    password: string;
}

export async function login({ email, password }: LoginProps) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
        console.error("Login Error:", errorMessage);
    }
}
