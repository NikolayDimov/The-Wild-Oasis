import styled from "styled-components";
import Spinner from "../../ui/Spinner";

import { StyledTable } from "../../ui/Table";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins-CabinTable";

const TableHeader = styled.header`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;

    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 600;
    color: var(--color-grey-600);
    padding: 1.6rem 2.4rem;
`;

function CabinTable() {
    const { isLoading, cabins } = useCabins();
    if (isLoading) return <Spinner />;

    return (
        <StyledTable role="table">
            <TableHeader role="row">
                <div></div>
                <div>Cabin</div>
                <div>Capacity</div>
                <div>Price</div>
                <div>Discount</div>
                <div></div>
            </TableHeader>
            {cabins && cabins.map((cabin) => <CabinRow key={cabin.id} cabin={cabin} />)}
        </StyledTable>
    );
}

export default CabinTable;
