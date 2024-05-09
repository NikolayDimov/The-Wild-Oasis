import { FieldErrors, useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CabinType, createCabin, editCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

interface CreateCabinFormProps {
    cabinToEdit?: CabinType;
}

const CreateCabinForm: React.FC<CreateCabinFormProps> = ({ cabinToEdit }) => {
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

    const queryClient = useQueryClient();
    const { register, handleSubmit, formState, reset, getValues } = useForm<CabinType>({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    const createCabinMutation = useMutation<void, Error, { newCabinData: CabinType }>({
        mutationFn: ({ newCabinData }: { newCabinData: CabinType }) => createCabin(newCabinData),
        onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            reset();
        },
        onError: (err) => toast.error(err.message),
    });

    const isCreating = createCabinMutation.status === "pending";

    const editCabinMutation = useMutation<void, Error, { updatedCabin: CabinType; id: string }>({
        mutationFn: ({ updatedCabin, id }: { updatedCabin: CabinType; id: string }) => editCabin(updatedCabin, id),
        onSuccess: () => {
            toast.success("Cabin successfully edited");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            reset();
        },
        onError: (err) => toast.error(err.message),
    });

    const isEditing = editCabinMutation.status === "pending";

    const isWorking = isCreating || isEditing;

    async function onSubmit(data: CabinType) {
        const image = typeof data.image === "string" ? data.image : data.image[0];
        try {
            if (isEditSession) {
                await editCabinMutation.mutateAsync({ updatedCabin: { ...data, image }, id: editId });
            } else {
                await createCabinMutation.mutateAsync({ newCabinData: { ...data, image: image } });
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
        <Form onSubmit={handleSubmit(onSubmit, onError)} type="modal">
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
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "Create new cabin"}</Button>
            </FormRow>
        </Form>
    );
};

export default CreateCabinForm;
