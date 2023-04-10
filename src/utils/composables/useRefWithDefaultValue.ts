import { ref, computed } from 'vue';

export function useRefWithDefaultValue<T>(defaultValue: T) {
    const value = ref<T>();
    const computedValue = computed({
        get() {
            return value.value ?? defaultValue;
        },
        set(newValue) {
            value.value = newValue;
        },
    });

    return computedValue;
}
