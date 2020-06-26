declare module 'stats' {
    type Comparator<T> = (a:T,b:T) => number

    export function getMaxIndex<T>(input: Array<T> , comparator: Comparator<T>): number;
    export function getMaxElement<T>(input: Array<T> , comparator: Comparator<T>): T | null;

    export const getMinIndex: typeof getMaxIndex;
    export const getMinElement: typeof getMaxElement;
    export const getMedianIndex: typeof getMaxIndex;
    export const getMedianElement: typeof getMaxElement;
    export function getAverageValue<T>(input: Array<T> , comparator: Comparator<T>): number | null;
    

}
