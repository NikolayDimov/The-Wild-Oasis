import React, { ChangeEvent } from "react";
import styled from "styled-components";

// Define the type for option in Select component
interface Option {
    value: string;
    label: string;
}

// Define the props for Select component
interface SelectProps {
    options: Option[]; // Array of Option objects
    value: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void; // Event handler
}

// Define the styled component for Select
const StyledSelect = styled.select<{ type?: string }>`
    // Accepts an optional type prop
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
    border: 1px solid ${(props) => (props.type === "white" ? "var(--color-grey-100)" : "var(--color-grey-300)")};
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    font-weight: 500;
    box-shadow: var(--shadow-sm);
`;

// Select component with TypeScript
const Select: React.FC<SelectProps> = ({ options, value, onChange, ...props }) => {
    return (
        <StyledSelect value={value} onChange={onChange} {...props}>
            {options.map((option) => (
                <option value={option.value} key={option.value}>
                    {option.label}
                </option>
            ))}
        </StyledSelect>
    );
};

export default Select;
