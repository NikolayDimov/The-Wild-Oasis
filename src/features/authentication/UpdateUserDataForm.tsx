import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
    const { user } = useUser();

    const email = user?.email;
    const currentFullName = user?.user_metadata?.fullName;

    const [fullName, setFullName] = useState(currentFullName);
    const [avatar, setAvatar] = useState<File | null>(null);

    useEffect(() => {
        if (user && user.user_metadata) {
            setFullName(user.user_metadata.fullName);
        }
    }, [user]);

    const { updateUser, isUpdating } = useUpdateUser();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!fullName) return;
        const form = e.target as HTMLFormElement;

        updateUser(
            { fullName, avatar },
            {
                onSuccess: () => {
                    setAvatar(null);
                    // Resetting form using .reset() that's available on all HTML form elements, otherwise the old filename will stay displayed in the UI
                    form.reset(); // Access the form directly and call reset on it
                },
            }
        );
    }

    function handleCancel() {
        // We don't even need preventDefault because this button was designed to reset the form (remember, it has the HTML attribute 'reset')
        setFullName(currentFullName);
        setAvatar(null);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label="Email address">
                <Input value={email} disabled />
            </FormRow>
            <FormRow label="Full name">
                <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={isUpdating} id="fullName" />
            </FormRow>
            <FormRow label="Avatar image">
                <FileInput
                    disabled={isUpdating}
                    id="avatar"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setAvatar(file);
                        }
                    }}
                    // We should also validate that it's actually an image, but never mind
                />
            </FormRow>
            <FormRow>
                <Button onClick={handleCancel} type="reset" variation="secondary">
                    Cancel
                </Button>
                <Button disabled={isUpdating}>Update account</Button>
            </FormRow>
        </Form>
    );
}

export default UpdateUserDataForm;
