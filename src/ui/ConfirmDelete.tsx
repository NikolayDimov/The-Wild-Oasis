import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import React from "react";

interface ConfirmDeleteProps {
    resource: string;
    disabled: boolean;
    closeModal: () => void;
}

const StyledConfirmDelete = styled.div`
    width: 40rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    & p {
        color: var(--color-grey-500);
        margin-bottom: 1.2rem;
    }

    & div {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

function ConfirmDelete({ resource, disabled, closeModal }: ConfirmDeleteProps) {
    function handleConfirmClick() {}

    return (
        <StyledConfirmDelete>
            <Heading as="h3">Delete {resource}</Heading>
            <p>Are you sure you want to delete this {resource} permanently? This action cannot be undone.</p>

            <div>
                <Button variation="secondary" onClick={closeModal}>
                    Cancel
                </Button>
                <Button variation="danger" onClick={handleConfirmClick} disabled={disabled}>
                    Delete
                </Button>
            </div>
        </StyledConfirmDelete>
    );
}

export default ConfirmDelete;
