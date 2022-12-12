import {useCallback, useRef} from 'react';

// ----------------------------------------------------------------------

interface useDebounceProps {
    callback: (...args: any[]) => void;
    delay: number;
}

// ----------------------------------------------------------------------

const useDebounce = ({callback, delay}: useDebounceProps) => {
    const timer = useRef(null);


    return useCallback((...args: any[]) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }

        // @ts-ignore
        timer.current = setTimeout(() => {
            callback(...args);
        }, delay)

    }, [callback, delay]);
};

export default useDebounce;