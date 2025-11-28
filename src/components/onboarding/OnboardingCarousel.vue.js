import OnboardingSlide from './OnboardingSlide.vue';
import ProgressDots from './ProgressDots.vue';
import { useCarousel } from '@/composables/useCarousel';
const props = defineProps();
const { current, next, prev, goTo, canPrev, onPointerDown, onPointerMove, onPointerUp } = useCarousel(props.slides.length, { loop: true });
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ onPointerdown: (__VLS_ctx.onPointerDown) },
    ...{ onPointermove: (__VLS_ctx.onPointerMove) },
    ...{ onPointerup: (__VLS_ctx.onPointerUp) },
    ...{ onPointercancel: (__VLS_ctx.onPointerUp) },
    ...{ onPointerleave: (__VLS_ctx.onPointerUp) },
    ...{ class: "relative w-full select-none" },
});
// @ts-ignore
[onPointerDown, onPointerMove, onPointerUp, onPointerUp, onPointerUp,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "relative overflow-hidden rounded-300" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex transition-transform duration-300 ease-out" },
    ...{ style: ({ transform: `translateX(-${__VLS_ctx.current * 100}%)` }) },
});
// @ts-ignore
[current,];
for (const [s, i] of __VLS_getVForSourceType((__VLS_ctx.slides))) {
    // @ts-ignore
    [slides,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        key: (i),
        ...{ class: "min-w-full" },
    });
    /** @type {[typeof OnboardingSlide, typeof OnboardingSlide, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(OnboardingSlide, new OnboardingSlide({
        ...(s),
    }));
    const __VLS_1 = __VLS_0({
        ...(s),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    const { default: __VLS_3 } = __VLS_2.slots;
    {
        const { default: __VLS_4 } = __VLS_2.slots;
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "mt-4 flex items-center justify-center md:hidden" },
        });
        /** @type {[typeof ProgressDots, ]} */ ;
        // @ts-ignore
        const __VLS_5 = __VLS_asFunctionalComponent(ProgressDots, new ProgressDots({
            ...{ 'onSelect': {} },
            index: (__VLS_ctx.current),
            total: (__VLS_ctx.slides.length),
        }));
        const __VLS_6 = __VLS_5({
            ...{ 'onSelect': {} },
            index: (__VLS_ctx.current),
            total: (__VLS_ctx.slides.length),
        }, ...__VLS_functionalComponentArgsRest(__VLS_5));
        let __VLS_8;
        let __VLS_9;
        const __VLS_10 = ({ select: {} },
            { onSelect: (__VLS_ctx.goTo) });
        // @ts-ignore
        [current, slides, goTo,];
        var __VLS_7;
    }
    var __VLS_2;
}
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.prev) },
    ...{ class: "absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-secondary-500 text-primary-600 shadow-e-100 transition hover:bg-secondary-600 md:flex" },
    disabled: (!__VLS_ctx.canPrev),
    'aria-label': "Précédent",
});
// @ts-ignore
[prev, canPrev,];
__VLS_asFunctionalElement(__VLS_elements.svg, __VLS_elements.svg)({
    xmlns: "http://www.w3.org/2000/svg",
    ...{ class: "h-5 w-5" },
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    'stroke-width': "2",
});
__VLS_asFunctionalElement(__VLS_elements.path)({
    d: "M15 18l-6-6 6-6",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.next) },
    ...{ class: "absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-secondary-500 text-primary-600 shadow-e-100 transition hover:bg-secondary-600 md:flex" },
    'aria-label': "Suivant",
});
// @ts-ignore
[next,];
__VLS_asFunctionalElement(__VLS_elements.svg, __VLS_elements.svg)({
    xmlns: "http://www.w3.org/2000/svg",
    ...{ class: "h-5 w-5" },
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    'stroke-width': "2",
});
__VLS_asFunctionalElement(__VLS_elements.path)({
    d: "M9 6l6 6-6 6",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mt-5 hidden items-center justify-center md:flex" },
});
/** @type {[typeof ProgressDots, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(ProgressDots, new ProgressDots({
    ...{ 'onSelect': {} },
    index: (__VLS_ctx.current),
    total: (__VLS_ctx.slides.length),
}));
const __VLS_13 = __VLS_12({
    ...{ 'onSelect': {} },
    index: (__VLS_ctx.current),
    total: (__VLS_ctx.slides.length),
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
let __VLS_15;
let __VLS_16;
const __VLS_17 = ({ select: {} },
    { onSelect: (__VLS_ctx.goTo) });
// @ts-ignore
[current, slides, goTo,];
var __VLS_14;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-300']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-out']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['md:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-3']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['h-10']} */ ;
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-secondary-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-e-100']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-secondary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['right-3']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['h-10']} */ ;
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-secondary-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-e-100']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-secondary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-5']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
