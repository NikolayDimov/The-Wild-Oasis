import supabase from "./supabase";
import { supabaseUrl } from "../services/supabase";

export interface LoginProps {
    email: string;
    password: string;
}

export interface SignupParams {
    fullName: string;
    email: string;
    password: string;
}

interface UpdateCurrentUserParams {
    password?: string;
    fullName?: string;
    avatar?: File | null;
}

interface UserAttributes {
    email?: string;
    password?: string;
    data?: {
        fullName?: string;
    };
}

export async function signup({ fullName, email, password }: SignupParams) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
            },
        },
    });

    if (error) throw new Error(error.message);

    return data;
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

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return null;
    const { data, error } = await supabase.auth.getUser();
    console.log(data);

    if (error) {
        throw new Error(error.message);
    }

    return data?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw new Error(error.message);
    }
}

export async function updateCurrentUser({ password, fullName, avatar }: UpdateCurrentUserParams) {
    // 1. Update password OR fullName

    let updateData: UserAttributes = {};
    if (password) updateData = { password };
    if (fullName) updateData = { data: { fullName } };

    const { data, error } = await supabase.auth.updateUser(updateData);

    if (error) throw new Error(error.message);
    if (!avatar) return data;

    // 2. Upload the avatar image
    const fileName = `avatar-${data.user.id}-${Math.random()}`;

    const { error: storageError } = await supabase.storage.from("avatars").upload(fileName, avatar);

    if (storageError) throw new Error(storageError.message);

    // 3. Update avatar in the user
    const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
        data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
        },
    });

    if (error2) throw new Error(error2.message);
    return updatedUser;
}
