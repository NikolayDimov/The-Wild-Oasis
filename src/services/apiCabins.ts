import supabase from "./supabase";

export interface CabinType {
    id: string;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: FileList | null; // Assuming 'image' is a file input
}

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }

    return data;
}

export async function createCabin(newCabin: CabinType) {
    const { data, error } = await supabase.from("cabins").insert([newCabin]).select();

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be created");
    }

    return data;
}

export async function deleteCabin(id: string) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be deleted");
    }

    return data;
}
