import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BackButton from '@/components/common/BackButton.vue';
import ProgressBar from '@/components/common/ProgressBar.vue';
import IconCoucou from '@/components/icons/IconCoucou.vue';
const route = useRoute();
const firstName = computed(() => {
    const value = history.state?.firstName;
    return value ?? '';
});
const progress = 0.66;
const categories = [
    {
        id: 'cat1',
        label: 'Catégorie 1',
        items: [
            { id: 'c1-1', label: 'Photo' },
            { id: 'c1-2', label: 'Photo' },
            { id: 'c1-3', label: 'Photo' },
        ],
    },
    {
        id: 'cat2',
        label: 'Catégorie 2',
        items: [
            { id: 'c2-1', label: 'Photo' },
            { id: 'c2-2', label: 'Photo' },
            { id: 'c2-3', label: 'Photo' },
        ],
    },
    {
        id: 'cat3',
        label: 'Catégorie 3',
        items: [
            { id: 'c3-1', label: 'Photo' },
            { id: 'c3-2', label: 'Photo' },
            { id: 'c3-3', label: 'Photo' },
        ],
    },
];
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.main, __VLS_elements.main)({
    ...{ class: "min-h-screen bg-surface-bg text-primary-600 px-6 py-10" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mx-auto w-full max-w-3xl space-y-6" },
});
__VLS_asFunctionalElement(__VLS_elements.header, __VLS_elements.header)({
    ...{ class: "flex items-center gap-4" },
});
/** @type {[typeof BackButton, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(BackButton, new BackButton({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {[typeof ProgressBar, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(ProgressBar, new ProgressBar({
    value: (__VLS_ctx.progress),
}));
const __VLS_5 = __VLS_4({
    value: (__VLS_ctx.progress),
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
// @ts-ignore
[progress,];
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "grid items-start gap-6 md:grid-cols-[auto,1fr]" },
});
/** @type {[typeof IconCoucou, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(IconCoucou, new IconCoucou({
    ...{ class: "h-20 w-20 text-primary-600" },
}));
const __VLS_9 = __VLS_8({
    ...{ class: "h-20 w-20 text-primary-600" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "relative rounded-400 bg-surface-panel px-4 py-3 text-primary-600 shadow-e-100" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
(__VLS_ctx.firstName || 'leener');
// @ts-ignore
[firstName,];
__VLS_asFunctionalElement(__VLS_elements.br)({});
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "space-y-6" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "text-3xl font-bold text-primary-600" },
});
for (const [category] of __VLS_getVForSourceType((__VLS_ctx.categories))) {
    // @ts-ignore
    [categories,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        key: (category.id),
        ...{ class: "space-y-3" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
        ...{ class: "text-lg font-semibold text-primary-600" },
    });
    (category.label);
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "grid grid-cols-2 gap-3 sm:grid-cols-3" },
    });
    for (const [item] of __VLS_getVForSourceType((category.items))) {
        __VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
            key: (item.id),
            ...{ class: "flex aspect-square flex-col items-center justify-center rounded-300 bg-primary-600 text-surface-button shadow-e-200" },
        });
        __VLS_asFunctionalElement(__VLS_elements.svg, __VLS_elements.svg)({
            xmlns: "http://www.w3.org/2000/svg",
            ...{ class: "h-10 w-10" },
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            'stroke-width': "2",
        });
        __VLS_asFunctionalElement(__VLS_elements.path)({
            d: "M4 7h16v10H4z",
        });
        __VLS_asFunctionalElement(__VLS_elements.circle)({
            cx: "8",
            cy: "11",
            r: "1.5",
        });
        __VLS_asFunctionalElement(__VLS_elements.path)({
            d: "M13 12l2-2 3 4",
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "mt-2 text-sm font-semibold" },
        });
        (item.label);
    }
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "flex justify-center pt-4" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ class: "w-full max-w-md rounded-400 bg-cta-600 px-6 py-3 text-surface-button shadow-e-300 transition hover:bg-primary-700" },
});
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-surface-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-10']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-[auto,1fr]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-20']} */ ;
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-400']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-surface-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-e-100']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['aspect-square']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-300']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-surface-button']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-e-200']} */ ;
/** @type {__VLS_StyleScopedClasses['h-10']} */ ;
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-400']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-cta-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-surface-button']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-e-300']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-primary-700']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
