import { ReactNode, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

import { useOutsideClickMenus } from "../hooks/useOutsideClickMenus";

interface StyledListProps {
    position: { x: number; y: number };
}

export const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export const StyledToggle = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-700);
    }
`;

export const StyledList = styled.ul<StyledListProps>`
    position: fixed;

    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);

    right: ${(props) => props.position.x}px;
    top: ${(props) => props.position.y}px;
`;

export const StyledButton = styled.button`
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 1.2rem 2.4rem;
    font-size: 1.4rem;
    transition: all 0.2s;

    display: flex;
    align-items: center;
    gap: 1.6rem;

    &:hover {
        background-color: var(--color-grey-50);
    }

    & svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }
`;

interface MenusContextType {
    open: (name: string) => void;
    close: () => void;
    openId: string;
    position: { x: number; y: number } | null;
    setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number } | null>>;
}

const MenusContext = createContext<MenusContextType>({
    open: () => {},
    close: () => {},
    openId: "",
    position: null,
    setPosition: () => {},
});

interface MenusProps {
    children: ReactNode;
}
const Menus: React.FC<MenusProps> & {
    Menu: typeof Menu;
    Toggle: React.FC<ToggleProps>;
    List: React.FC<ListProps>;
    Button: React.FC<ButtonProps>;
} = ({ children }) => {
    const [openId, setOpenId] = useState<string>("");
    const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

    const close = () => setOpenId("");
    const open = setOpenId;

    return <MenusContext.Provider value={{ openId, close, open, position, setPosition }}>{children}</MenusContext.Provider>;
};

interface ToggleProps {
    id: string;
}
const Toggle: React.FC<ToggleProps> = ({ id }) => {
    const { openId, close, open, setPosition } = useContext(MenusContext);

    function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.stopPropagation();
        const button = event.target as HTMLButtonElement;
        const rect = button.closest("button")?.getBoundingClientRect();
        if (rect) {
            setPosition({
                x: window.innerWidth - rect.width - rect.x,
                y: rect.y + rect.height + 8,
            });
        }
        console.log(rect);

        openId === "" || openId !== id ? open(id) : close();
    }

    return (
        <StyledToggle onClick={handleClick}>
            <HiEllipsisVertical />
        </StyledToggle>
    );
};

interface ListProps {
    id?: string;
    children: ReactNode;
}

const List: React.FC<ListProps> = ({ id, children }) => {
    const { openId, position, close } = useContext(MenusContext);
    const ref = useOutsideClickMenus({ handler: close }, false);

    if (openId !== id || !position) return null;
    const { x, y } = position;

    return createPortal(
        <StyledList ref={ref} position={{ x, y }}>
            {children}
        </StyledList>,
        document.body
    );
};

interface ButtonProps {
    children: ReactNode;
    icon: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({ children, icon, onClick, disabled }) => {
    const { close } = useContext(MenusContext);

    function handleClick() {
        onClick && onClick();
        close();
    }

    return (
        <li>
            <StyledButton onClick={handleClick} disabled={disabled}>
                {icon}
                <span>{children}</span>
            </StyledButton>
        </li>
    );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
