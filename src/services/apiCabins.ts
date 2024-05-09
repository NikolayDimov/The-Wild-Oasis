import supabase, { supabaseUrl } from "./supabase";

// Your code here...

export interface CabinType {
    id?: string;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image?: string | File | null;
}

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }

    return data;
}

// apiCabins.ts
export async function createCabin(newCabin: CabinType) {
    console.log("newCabin", newCabin);

    if (!newCabin.image) {
        throw new Error("Image is required");
    }

    const imageFile = newCabin.image as File;
    console.log("imageFile", imageFile);
    const imageName = `${Math.random()}-${imageFile.name}`.replaceAll("/", "");
    if (!imageName) {
        throw new Error("Failed to generate image name");
    }
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const supabasequery = supabase.from("cabins").insert([{ ...newCabin, image: imagePath }]);

    const { data, error } = await supabasequery.single();

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

export async function editCabin(updatedCabin: CabinType, id: string) {
    const { image } = updatedCabin;

    if (image instanceof File) {
        // If image exists, upload it
        const imageFile = image;
        const imageName = `${Math.random()}-${imageFile.name}`.replaceAll("/", "");
        const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

        // Upload image
        const { error: storageError } = await supabase.storage.from("cabin-images").upload(imageName, imageFile);

        if (storageError) {
            console.error(storageError);
            throw new Error("Cabin image could not be uploaded");
        }

        // Update image path
        updatedCabin.image = imagePath;
    }

    const supabasequery = supabase.from("cabins").update(updatedCabin).eq("id", id);

    const { data, error } = await supabasequery.single();

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be updated");
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
