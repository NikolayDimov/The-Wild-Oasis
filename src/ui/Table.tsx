import { ReactNode, createContext, useContext } from "react";
import styled, { CSSProperties } from "styled-components";
import { CabinType } from "../services/apiCabins";

export const StyledTable = styled.div`
    border: 1px solid var(--color-grey-200);

    font-size: 1.4rem;
    background-color: var(--color-grey-0);
    border-radius: 7px;
    overflow: hidden;
`;

const CommonRow = styled.div<{ $columns?: string | CSSProperties["gridTemplateColumns"] }>`
    display: grid;
    grid-template-columns: ${(props) => props.$columns};
    column-gap: 2.4rem;
    align-items: center;
    transition: none;
`;

export const StyledHeader = styled(CommonRow)`
    padding: 1.6rem 2.4rem;

    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 600;
    color: var(--color-grey-600);
`;

export const StyledBody = styled.section`
    margin: 0.4rem 0;
`;

export const StyledRow = styled(CommonRow)`
    padding: 1.2rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

export const Footer = styled.footer`
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    padding: 1.2rem;

    &:not(:has(*)) {
        display: none;
    }
`;

export const Empty = styled.p`
    font-size: 1.6rem;
    font-weight: 500;
    text-align: center;
    margin: 2.4rem;
`;

interface TableContextType {
    columns: string | CSSProperties["gridTemplateColumns"];
}

const TableContext = createContext<TableContextType>({ columns: "" });

function Table({ columns, children }: { columns: string | CSSProperties["gridTemplateColumns"]; children: ReactNode }) {
    return (
        <TableContext.Provider value={{ columns }}>
            <StyledTable role="table">{children}</StyledTable>
        </TableContext.Provider>
    );
}

function Header({ children }: { children: ReactNode }) {
    const { columns } = useContext(TableContext);
    return (
        <StyledHeader role="row" $columns={columns} as="header">
            {children}
        </StyledHeader>
    );
}

function Row({ children }: { children: ReactNode }) {
    const { columns } = useContext(TableContext);
    return (
        <StyledRow role="row" $columns={columns}>
            {children}
        </StyledRow>
    );
}

function Body({ data, render }: { data: CabinType[]; render: (cabin: CabinType) => React.ReactNode }) {
    if (!data.length) {
        return <Empty>No data to show at the moment</Empty>;
    }
    return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
