import { ref, computed, onMounted, onUnmounted } from 'vue';
export function useCarousel(length, options) {
    const current = ref(0);
    const loop = options?.loop ?? false;
    const canPrev = computed(() => loop || current.value > 0);
    const canNext = computed(() => loop || current.value < length - 1);
    const next = () => {
        if (length === 0)
            return;
        if (loop)
            current.value = (current.value + 1) % length;
        else if (canNext.value)
            current.value += 1;
    };
    const prev = () => {
        if (length === 0)
            return;
        if (loop)
            current.value = (current.value - 1 + length) % length;
        else if (canPrev.value)
            current.value -= 1;
    };
    const goTo = (i) => { if (i >= 0 && i < length)
        current.value = i; };
    // clavier (gauche/droite)
    const onKey = (e) => {
        if (e.key === 'ArrowRight')
            next();
        if (e.key === 'ArrowLeft')
            prev();
    };
    onMounted(() => window.addEventListener('keydown', onKey));
    onUnmounted(() => window.removeEventListener('keydown', onKey));
    // swipe
    let startX = 0, dx = 0;
    const onPointerDown = (e) => { startX = e.clientX; dx = 0; };
    const onPointerMove = (e) => { if (startX)
        dx = e.clientX - startX; };
    const onPointerUp = () => {
        if (Math.abs(dx) > 60) {
            dx < 0 ? next() : prev();
        }
        startX = 0;
        dx = 0;
    };
    return { current, next, prev, goTo, canPrev, canNext, onPointerDown, onPointerMove, onPointerUp };
}
