import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";

// import { useCreateCabin } from "features/cabins/useCreateCabin";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
// import { useEditCabin } from "./useEditCabin";
import { Textarea } from "../../ui/Textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CabinType, createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

// interface FormData {
//     id: string;
//     name: string;
//     maxCapacity: number;
//     regularPrice: number;
//     discount: number;
//     description: string;
//     image: FileList | null; // Assuming 'image' is a file input
// }

// Receives closeModal directly from Modal
function CreateCabinForm({ cabinToEdit, closeModal }) {
    // const { mutate: createCabin, isLoading: isCreating } = useCreateCabin();
    // const { mutate: editCabin, isLoading: isEditing } = useEditCabin();
    // const isWorking = isCreating || isEditing;

    // // For an editing session
    // const { id: editId, ...editValues } = cabinToEdit || {};
    // delete editValues.created_at;
    // const isEditSession = Boolean(editId);

    // const { register, handleSubmit, formState, reset, getValues } = useForm({
    //     defaultValues: isEditSession ? editValues : {},
    // });

    const queryClient = useQueryClient();
    const { register, handleSubmit, formState, reset, getValues } = useForm();
    const { errors } = formState;

    const mutation = useMutation({
        mutationFn: (newCabin: CabinType) => createCabin(newCabin),
        onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            reset();
        },
        onError: (err) => toast.error(err.message),
    });

    const { mutate, status } = mutation;
    const isCreating = status === "pending";

    const onSubmit: SubmitHandler<CabinType> = function (data) {
        // const options = {
        //     onSuccess: (data) => {
        //         // If this component is used OUTSIDE the Modal Context, this will return undefined, so we need to test for this
        //         closeModal?.();
        //         reset();
        //     },
        // };

        // let image: File | undefined;
        // if (data.image) {
        //     image = typeof data.image === "object" ? data.image[0] : data.image;
        // }

        // if (isEditSession)
        //     editCabin(
        //         {
        //             newCabinData: { ...data, image },
        //             id: editId,
        //         },
        //         options
        //     );
        // else createCabin({ ...data, image }, options);

        mutate(data);

        console.log(data);
    };

    // Invoked when validation fails
    const onError = function (errors: FieldErrors) {
        console.log("Failed validation!", errors);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)} type="modal">
            <FormRow label="Cabin name" error={errors?.name?.message as string}>
                <Input
                    type="text"
                    id="name"
                    // disabled={isWorking}
                    {...register("name", { required: "This field is required" })}
                />
            </FormRow>

            <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message as string}>
                <Input
                    type="number"
                    id="maxCapacity"
                    // disabled={isWorking}
                    {...register("maxCapacity", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Regular price" error={errors?.regularPrice?.message as string}>
                <Input
                    type="number"
                    id="regularPrice"
                    // disabled={isWorking}
                    {...register("regularPrice", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Price should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message as string}>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    // disabled={isWorking}
                    {...register("discount", {
                        required: "Can't be empty, make it at least 0",
                        validate: (value) => getValues().regularPrice >= value || "Discount should be less than regular price",
                    })}
                />
            </FormRow>

            <FormRow label="Description for website" error={errors?.description?.message as string}>
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    // disabled={isWorking}
                    {...register("description", { required: "This field is required" })}
                />
            </FormRow>

            <FormRow label="Cabin photo" error={errors?.image?.message as string}>
                <FileInput
                    id="image"
                    accept="image/*"
                    // disabled={isWorking}
                    {...register("image", {
                        // required: 'This field is required',
                        // required: isEditSession ? false : "This field is required",
                        // VIDEO this doesn't work, so never mind about this, it's too much
                        // validate: (value) =>
                        //   value[0]?.type.startsWith('image/') || 'Needs to be an image',
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    variation="secondary"
                    type="reset"
                    // disabled={isWorking}
                    onClick={() => closeModal?.()}
                >
                    Cancel
                </Button>
                <Button disabled={isCreating}>Add cabin</Button>
                {/* <Button 
                disabled={isWorking}>{isEditSession ? "Edit cabin" : "Create new cabin"}
                </Button> */}
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
