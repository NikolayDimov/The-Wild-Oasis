import { ReactElement, ReactNode, cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

export const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 3.2rem 4rem;
    transition: all 0.5s;
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 1000;
    transition: all 0.5s;
`;

export const Button = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1.2rem;
    right: 1.9rem;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-500);
    }
`;

interface ModalContextType {
    open: (name: string) => void;
    close: () => void;
    openName: string;
}

const ModalContext = createContext<ModalContextType>({
    open: () => {},
    close: () => {},
    openName: "",
});

interface ModalProps {
    children: ReactNode;
}

const Modal: React.FC<ModalProps> & {
    Open: React.FC<OpenProps>;
    Window: React.FC<WindowProps>;
} = ({ children }) => {
    const [openName, setOpenName] = useState<string>("");

    const close = () => setOpenName("");
    const open = setOpenName;

    return <ModalContext.Provider value={{ openName, close, open }}>{children}</ModalContext.Provider>;
};

interface OpenProps {
    children: ReactElement;
    opens: string;
}

const Open: React.FC<OpenProps> = ({ children, opens: opensWindowName }) => {
    const { open } = useContext(ModalContext);

    return cloneElement(children, { onClick: () => open(opensWindowName) });
};

interface WindowProps {
    children: ReactElement;
    name: string;
}

const Window: React.FC<WindowProps> = ({ children, name }) => {
    const { openName, close } = useContext(ModalContext);

    if (name !== openName) {
        return null;
    }

    return createPortal(
        <Overlay>
            <StyledModal>
                <Button onClick={close}>
                    <HiXMark />
                </Button>
                <div>{cloneElement(children, { onCloseModal: close })}</div>
            </StyledModal>
        </Overlay>,
        document.body
    );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
