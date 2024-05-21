// import { FieldErrors, useForm } from "react-hook-form";
// import FormRow from "../../ui/FormRow";
// import Input from "../../ui/Input";
// import Form from "../../ui/Form";
// import Button from "../../ui/Button";
// import FileInput from "../../ui/FileInput";
// import { Textarea } from "../../ui/Textarea";
// import { CabinType } from "../../services/apiCabins";
// import toast from "react-hot-toast";
// import { useCreateCabin } from "./useCreateCabin";
// import { useEditcabin } from "./useEditCabin";

// interface CreateCabinFormProps {
//     cabinToEdit?: CabinType;
//     onCloseModal?: () => void;
// }

// const CreateCabinForm: React.FC<CreateCabinFormProps> = ({ cabinToEdit, onCloseModal }) => {
//     const { id: editId = "", ...editValues } = cabinToEdit || {
//         id: "",
//         name: "",
//         maxCapacity: 0,
//         regularPrice: 0,
//         discount: 0,
//         description: "",
//         image: null,
//     };

//     const isEditSession = Boolean(editId);

//     const { register, handleSubmit, formState, reset, getValues } = useForm<CabinType>({
//         defaultValues: isEditSession ? editValues : {},
//     });
//     const { errors } = formState;

//     const { isCreating, createCabin } = useCreateCabin();
//     const { isEditing, editCabin } = useEditcabin();

//     const isWorking = isCreating || isEditing;

//     async function onSubmit(data: CabinType) {
//         const image = typeof data.image === "string" ? data.image : data.image[0];

//         try {
//             if (isEditSession) {
//                 await editCabin(
//                     { updatedCabin: { ...data, image }, id: editId },
//                     {
//                         onSuccess: (data) => {
//                             reset();
//                             onCloseModal?.();
//                         },
//                     }
//                 );
//             } else {
//                 await createCabin(
//                     { newCabinData: { ...data, image: image } },
//                     {
//                         onSuccess: (data) => {
//                             reset();
//                             onCloseModal?.();
//                         },
//                     }
//                 );
//             }
//         } catch (err) {
//             if (err instanceof Error) {
//                 toast.error(err.message);
//             }
//         }
//     }

//     const onError = function (errors: FieldErrors<CabinType>) {
//         console.log("Failed validation!", errors);
//     };

//     return (
//         <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal" : "regular"}>
//             <FormRow label="Cabin name" error={errors?.name?.message as string}>
//                 <Input type="text" id="name" disabled={isWorking} {...register("name", { required: "This field is required" })} />
//             </FormRow>

//             <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message as string}>
//                 <Input
//                     type="number"
//                     id="maxCapacity"
//                     disabled={isWorking}
//                     {...register("maxCapacity", {
//                         required: "This field is required",
//                         min: {
//                             value: 1,
//                             message: "Capacity should be at least 1",
//                         },
//                     })}
//                 />
//             </FormRow>

//             <FormRow label="Regular price" error={errors?.regularPrice?.message as string}>
//                 <Input
//                     type="number"
//                     id="regularPrice"
//                     disabled={isWorking}
//                     {...register("regularPrice", {
//                         required: "This field is required",
//                         min: {
//                             value: 1,
//                             message: "Price should be at least 1",
//                         },
//                     })}
//                 />
//             </FormRow>

//             <FormRow label="Discount" error={errors?.discount?.message as string}>
//                 <Input
//                     type="number"
//                     id="discount"
//                     defaultValue={0}
//                     disabled={isWorking}
//                     {...register("discount", {
//                         required: "Can't be empty, make it at least 0",
//                         validate: (value) => getValues().regularPrice >= value || "Discount should be less than regular price",
//                     })}
//                 />
//             </FormRow>

//             <FormRow label="Description for website" error={errors?.description?.message as string}>
//                 <Textarea
//                     id="description"
//                     defaultValue=""
//                     disabled={isWorking}
//                     {...register("description", { required: "This field is required" })}
//                 />
//             </FormRow>

//             <FormRow label="Cabin photo" error={errors?.image?.message as string}>
//                 <FileInput
//                     id="image"
//                     accept="image/*"
//                     disabled={isWorking}
//                     {...register("image", {
//                         required: isEditSession ? false : "This field is required",
//                     })}
//                 />
//             </FormRow>

//             <FormRow>
//                 <Button variation="secondary" type="reset" onClick={() => onCloseModal && onCloseModal()}>
//                     Cancel
//                 </Button>
//                 <Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "Create new cabin"}</Button>
//             </FormRow>
//         </Form>
//     );
// };

// export default CreateCabinForm;

import { FieldErrors, useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { CabinType } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useCreateCabin } from "./useCreateCabin";
import { useEditcabin } from "./useEditCabin";

interface CreateCabinFormProps {
    cabinToEdit?: CabinType;
    onCloseModal?: () => void;
}

const CreateCabinForm: React.FC<CreateCabinFormProps> = ({ cabinToEdit, onCloseModal }) => {
    const { id: editId = "", ...editValues } = cabinToEdit || {
        id: "",
        name: "",
        maxCapacity: 0,
        regularPrice: 0,
        discount: 0,
        description: "",
        image: null,
    };

    const isEditSession = Boolean(editId);

    const { register, handleSubmit, formState, reset, getValues } = useForm<CabinType>({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    const { isCreating, createCabin } = useCreateCabin();
    const { isEditing, editCabin } = useEditcabin();

    const isWorking = isCreating || isEditing;

    async function onSubmit(data: CabinType) {
        let image: string | File | null = null;

        if (typeof data.image === "string") {
            image = data.image;
        } else if (data.image instanceof FileList && data.image.length > 0) {
            image = data.image[0];
        }

        try {
            if (isEditSession) {
                await editCabin(
                    { updatedCabin: { ...data, image }, id: editId },
                    {
                        onSuccess: () => {
                            reset();
                            onCloseModal?.();
                        },
                    }
                );
            } else {
                await createCabin(
                    { newCabinData: { ...data, image: image } },
                    {
                        onSuccess: () => {
                            reset();
                            onCloseModal?.();
                        },
                    }
                );
            }
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            }
        }
    }

    const onError = function (errors: FieldErrors<CabinType>) {
        console.log("Failed validation!", errors);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal" : "regular"}>
            <FormRow label="Cabin name" error={errors?.name?.message as string}>
                <Input type="text" id="name" disabled={isWorking} {...register("name", { required: "This field is required" })} />
            </FormRow>

            <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message as string}>
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
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
                    disabled={isWorking}
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
                    disabled={isWorking}
                    {...register("discount", {
                        required: "Can't be empty, make it at least 0",
                        validate: (value) => getValues().regularPrice >= value || "Discount should be less than regular price",
                    })}
                />
            </FormRow>

            <FormRow label="Description for website" error={errors?.description?.message as string}>
                <Textarea
                    id="description"
                    defaultValue=""
                    disabled={isWorking}
                    {...register("description", { required: "This field is required" })}
                />
            </FormRow>

            <FormRow label="Cabin photo" error={errors?.image?.message as string}>
                <FileInput
                    id="image"
                    accept="image/*"
                    disabled={isWorking}
                    {...register("image", {
                        required: isEditSession ? false : "This field is required",
                    })}
                />
            </FormRow>

            <FormRow>
                <Button variation="secondary" type="reset" onClick={() => onCloseModal && onCloseModal()}>
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "Create new cabin"}</Button>
            </FormRow>
        </Form>
    );
};

export default CreateCabinForm;
