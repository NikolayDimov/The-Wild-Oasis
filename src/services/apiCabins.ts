import supabase, { supabaseUrl } from "./supabase";

export interface CabinType {
    id?: string;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: File | null; // Assuming 'image' is a file input
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
    if (!newCabin.image) {
        throw new Error("Image is required");
    }

    const imageFile = newCabin.image;
    const imageName = `${Math.random()}-${imageFile.name}`.replaceAll("/", "");
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const { data, error } = await supabase.from("cabins").insert([{ ...newCabin, image: imagePath }]);

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be created");
    }

    const { error: storageError } = await supabase.storage.from("cabin-images").upload(imageName, imageFile);

    if (storageError) {
        if (data) {
            const { id } = data;
            await supabase.from("cabins").delete().eq("id", id);
            console.error(storageError);
            throw new Error("Cabin image could not be uploaded and cabin was not created");
        }
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
