const __VLS_props = defineProps();
const __VLS_emit = defineEmits();
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
    ...{ class: "flex items-center gap-2" },
});
for (const [_, i] of __VLS_getVForSourceType((__VLS_ctx.total))) {
    // @ts-ignore
    [total,];
    __VLS_asFunctionalElement(__VLS_elements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.$emit('select', i);
                // @ts-ignore
                [$emit,];
            } },
        key: (i),
        type: "button",
        ...{ class: "h-2 w-2 rounded-full transition-all" },
        ...{ class: (i === __VLS_ctx.index ? 'bg-primary-600 w-3' : 'bg-primary-300') },
        'aria-label': (`Aller au slide ${i + 1}`),
    });
    // @ts-ignore
    [index,];
}
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
