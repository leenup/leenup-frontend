import { ref, onMounted } from 'vue';
const theme = ref('light');
export function useTheme() {
    const apply = () => {
        const el = document.documentElement;
        if (theme.value === 'dark')
            el.classList.add('dark');
        else
            el.classList.remove('dark');
    };
    onMounted(() => apply());
    const toggle = () => { theme.value = theme.value === 'dark' ? 'light' : 'dark'; apply(); };
    return { theme, toggle };
}
