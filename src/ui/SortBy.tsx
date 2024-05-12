import React from "react";
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

interface SortByProps {
    options: { value: string; label: string }[];
}

const SortBy: React.FC<SortByProps> = ({ options }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sortBy") || "";

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        searchParams.set("sortBy", e.target.value);
        setSearchParams(searchParams);
    }

    return <Select options={options} type="white" value={sortBy} onChange={handleChange} />;
};

export default SortBy;
