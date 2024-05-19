import { useForm, SubmitHandler } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

interface FormData {
    password: string;
    passwordConfirm: string;
}

function UpdatePasswordForm() {
    const { register, handleSubmit, formState, getValues, reset } = useForm<FormData>();
    const { errors } = formState;

    const { updateUser, isUpdating } = useUpdateUser();

    const onSubmit: SubmitHandler<FormData> = ({ password }) => {
        updateUser({ password }, { onSuccess: () => reset() });
    };

    // function handleReset(e: React.MouseEvent<HTMLButtonElement>) {
    //     e.preventDefault();
    //     reset();
    // }

    function handleReset() {
        reset();
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
                <Input
                    type="password"
                    id="password"
                    // this makes the form better for password managers
                    autoComplete="current-password"
                    disabled={isUpdating}
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 8,
                            message: "Password needs a minimum of 8 characters",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Confirm password" error={errors?.passwordConfirm?.message}>
                <Input
                    type="password"
                    autoComplete="new-password"
                    id="passwordConfirm"
                    disabled={isUpdating}
                    {...register("passwordConfirm", {
                        required: "This field is required",
                        validate: (value) => getValues().password === value || "Passwords need to match",
                    })}
                />
            </FormRow>
            <FormRow>
                <Button onClick={handleReset} type="reset" variation="secondary">
                    Cancel
                </Button>
                <Button disabled={isUpdating}>Update password</Button>
            </FormRow>
        </Form>
    );
}

export default UpdatePasswordForm;
