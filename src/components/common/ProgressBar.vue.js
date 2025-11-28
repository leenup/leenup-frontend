import { computed } from 'vue';
const props = defineProps();
const clamped = computed(() => {
    const v = Math.max(0, Math.min(props.value, 1));
    return Math.round(v * 100);
});
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
    ...{ class: "h-3 w-full rounded-full bg-secondary-400" },
});
__VLS_asFunctionalElement(__VLS_elements.div)({
    ...{ class: "h-full rounded-full bg-cta-600 transition-all duration-300" },
    ...{ style: ({ width: __VLS_ctx.clamped + '%' }) },
    role: "progressbar",
    'aria-valuenow': (__VLS_ctx.clamped),
    'aria-valuemin': "0",
    'aria-valuemax': "100",
});
// @ts-ignore
[clamped, clamped,];
/** @type {__VLS_StyleScopedClasses['h-3']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-secondary-400']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-cta-600']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
