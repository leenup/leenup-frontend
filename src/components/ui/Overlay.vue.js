const props = withDefaults(defineProps(), { mode: 'medium' });
const modeClass = { heavy: 'overlay-heavy', medium: 'overlay-medium', light: 'overlay-light' }[props.mode];
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = { mode: 'medium' };
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
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('close');
            // @ts-ignore
            [$emit,];
        } },
    ...{ class: "fixed inset-0 z-40" },
    ...{ class: (__VLS_ctx.modeClass) },
});
// @ts-ignore
[modeClass,];
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-40']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
