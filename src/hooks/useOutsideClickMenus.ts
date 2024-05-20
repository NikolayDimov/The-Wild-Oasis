import { useEffect, useRef } from "react";

interface useOutsideClickMenusProps {
    handler: (event: MouseEvent) => void;
    useCapture?: boolean;
}

export function useOutsideClickMenus(props: useOutsideClickMenusProps, useCapture = true): React.RefObject<HTMLUListElement> {
    const { handler } = props;
    const ref = useRef<HTMLUListElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                handler(e);
            }
        }

        document.addEventListener("click", handleClick, useCapture);

        return () => document.removeEventListener("click", handleClick, useCapture);
    }, [handler, useCapture]);

    return ref;
}
