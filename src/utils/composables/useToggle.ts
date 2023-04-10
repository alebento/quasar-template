/* eslint-disable no-redeclare */

import { isRef, Ref, ref } from 'vue';

export function useToggle(initialValue: Ref<boolean>): (value?: boolean) => boolean
export function useToggle(initialValue?: boolean): { value: Ref<boolean>, toggle: (value?: boolean) => boolean}
export function useToggle(
    initialValue: boolean | Ref<boolean> = false,
) {
    const valueIsRef = isRef(initialValue);
    const value = ref(initialValue);

    const toggle = () => {
        value.value = !value.value;
        return value.value;
    };

    if (valueIsRef) {
        return toggle;
    }

    return {
        value,
        toggle,
    } as const;
}
