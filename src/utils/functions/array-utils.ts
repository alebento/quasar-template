export function arrayToMap<K, T>(list: T[], getKey: (item: T) => K): Map<K, T> {
    const result = new Map<K, T>();

    list.forEach((item) => {
        result.set(getKey(item), item);
    });

    return result;
}

export function arrayToRecord<K extends string | number | symbol, T>(list: T[], getKey: (item: T) => K): Record<K, T> {
    const result: Record<string | number | symbol, T> = {};

    list.forEach((item) => {
        result[getKey(item)] = item;
    });

    return result;
}

export function arrayDistinct<T>(list: T[], getKey?: (item: T) => string): T[] {
    const visited = new Set<(T | string)>();
    const result: T[] = [];

    list.forEach((item) => {
        const key = getKey ? getKey(item) : item;

        if (!visited.has(key)) {
            visited.add(key);
            result.push(item);
        }
    });

    return result;
}

export function arrayMultipleSort<T>(list: T[], ...comparators: ((a: T, b: T) => number)[]): T[] {
    const flatComparators = comparators.flat();

    const sortedList = list.sort((a, b) => {
        for (const comparator of flatComparators) {
            const result = comparator(a, b);
            if (result !== 0) return result;
        }

        return 0;
    });

    return sortedList;
}

export function arrayMultipleSortList<T>(list: T[], comparators: ((a: T, b: T) => number)[]): T[] {
    return arrayMultipleSort(list, ...comparators);
}
