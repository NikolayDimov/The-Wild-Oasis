import { useEffect, useRef } from "react";

interface useOutsideClickProps {
    handler: (event: MouseEvent) => void;
}

export function useOutsideClick(props: useOutsideClickProps): React.RefObject<HTMLDivElement> {
    const { handler } = props;
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                handler(e);
            }
        }

        // document.addEventListener("click", handleClick)
        // Events in JS bubble up
        // When is clicked on 'Add new cabin' btn -> Modal will be attached to the DOM
        // This click will aslo detect click outsite the Modal window, which will immediately close that Modal window
        // we have to use not Bubble phase. We must use Capturing phase - as the event moves down the DOM tree
        // pass 'true' like last argument to addEventListener and removeEventListener. This will change Bubbling phase to Capturing phase
        document.addEventListener("click", handleClick, true);

        return () => document.removeEventListener("click", handleClick, true);
    }, [handler]);

    return ref;
}
