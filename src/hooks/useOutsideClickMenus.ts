import { useEffect, useRef } from "react";

interface useOutsideClickMenusProps {
    handler: (event: MouseEvent) => void;
}

export function useOutsideClickMenus(props: useOutsideClickMenusProps): React.RefObject<HTMLUListElement> {
    const { handler } = props;
    const ref = useRef<HTMLUListElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                handler(e);
            }
        }

        document.addEventListener("click", handleClick, true);

        return () => document.removeEventListener("click", handleClick, true);
    }, [handler]);

    return ref;
}
