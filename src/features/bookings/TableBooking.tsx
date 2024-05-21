import { ReactNode, createContext, useContext } from "react";
import styled, { CSSProperties } from "styled-components";
import { Booking } from "../../services/apiBookings";

export const StyledTable = styled.div`
    border: 1px solid var(--color-grey-200);

    font-size: 1.4rem;
    background-color: var(--color-grey-0);
    border-radius: 7px;
    overflow: hidden;
`;

interface CommonRowProps {
    $columns?: string | CSSProperties["gridTemplateColumns"];
    role?: string;
}

export const CommonRow = styled.div<CommonRowProps>`
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

interface TableProps {
    columns: string | CSSProperties["gridTemplateColumns"];
    children: ReactNode;
}
const Table: React.FC<TableProps> & {
    Header: React.FC<{ children: ReactNode }>;
    Row: React.FC<{ children: ReactNode; role?: string }>;
    BodyBooking: React.FC<{ data: Booking[]; render: (booking: Booking) => React.ReactNode }>;
    Footer: typeof Footer;
} = ({ columns, children }) => {
    return (
        <TableContext.Provider value={{ columns }}>
            <StyledTable role="table">{children}</StyledTable>
        </TableContext.Provider>
    );
};

interface HeaderProps {
    children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
    const { columns } = useContext(TableContext);
    return (
        <StyledHeader role="row" $columns={columns} as="header">
            {children}
        </StyledHeader>
    );
};

interface RowProps {
    children: ReactNode;
    role?: string;
}

const Row: React.FC<RowProps> = ({ children, role = "row" }) => {
    const { columns } = useContext(TableContext);
    return (
        <StyledRow role={role} $columns={columns}>
            {children}
        </StyledRow>
    );
};

interface BodyBookingProps {
    data: Booking[];
    render: (booking: Booking) => React.ReactNode;
}

const BodyBooking: React.FC<BodyBookingProps> = ({ data, render }) => {
    if (!data.length) {
        return <Empty>No data to show at the moment</Empty>;
    }
    return <StyledBody>{data.map(render)}</StyledBody>;
};

Table.Header = Header;
Table.Row = Row;
Table.BodyBooking = BodyBooking;
Table.Footer = Footer;

export default Table;
