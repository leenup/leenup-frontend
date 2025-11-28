import { computed } from 'vue';
const props = withDefaults(defineProps(), { variant: 'primary' });
const variantClasses = computed(() => ({
    'bg-cta-500 text-surface-button hover:bg-cta-600 active:shadow-pressed-primary': props.variant === 'primary',
    'bg-secondary-500 text-primary-600 hover:bg-secondary-600': props.variant === 'secondary',
    'bg-surface-panel text-primary-600 border border-secondary-300 hover:bg-secondary-400': props.variant === 'white',
    'bg-transparent text-primary-600 hover:bg-secondary-200': props.variant === 'ghost',
}));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = { variant: 'primary' };
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ class: "inline-flex items-center justify-center rounded-200 px-4 py-2 btn-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cta-300 disabled:opacity-50" },
    ...{ class: (__VLS_ctx.variantClasses) },
});
// @ts-ignore
[variantClasses,];
var __VLS_0 = {};
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-200']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-text']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:ring-cta-300']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0;
[__VLS_dollars.$attrs,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
