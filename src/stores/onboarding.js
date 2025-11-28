import { defineStore } from 'pinia';
import { ref } from 'vue';
const STORAGE_KEY = 'onboarding_role';
export const useOnboardingStore = defineStore('onboarding', () => {
    const role = ref(null);
    const setRole = (value) => {
        role.value = value;
        if (globalThis.window !== undefined) {
            localStorage.setItem(STORAGE_KEY, value);
        }
    };
    const loadFromStorage = () => {
        if (globalThis.window === undefined)
            return;
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'leener' || stored === 'mentor') {
            role.value = stored;
        }
    };
    return { role, setRole, loadFromStorage };
});
