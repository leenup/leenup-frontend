import { computed, ref, watchEffect, watch } from 'vue';
const props = withDefaults(defineProps(), {
    type: 'success',
    duration: 5000,
});
const visible = ref(true);
const startTime = ref(Date.now());
const variantClass = computed(() => props.type === 'error'
    ? 'bg-red-600'
    : 'bg-green-600');
watchEffect((onInvalidate) => {
    visible.value = true;
    startTime.value = Date.now();
    const timer = globalThis.setTimeout(() => { visible.value = false; }, props.duration);
    onInvalidate(() => globalThis.clearTimeout(timer));
});
watch(() => props.message, () => {
    visible.value = true;
    startTime.value = Date.now();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = {
    type: 'success',
    duration: 5000,
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
// @ts-ignore
Transition;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    name: "toast-slide",
}));
const __VLS_2 = __VLS_1({
    name: "toast-slide",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
if (__VLS_ctx.visible) {
    // @ts-ignore
    [visible,];
    __VLS_asFunctionalElement(__VLS_elements.output, __VLS_elements.output)({
        ...{ class: "fixed bottom-4 right-4 z-50 min-w-[240px] max-w-sm rounded-300 px-4 py-3 shadow-e-300 text-white" },
        ...{ class: (__VLS_ctx.variantClass) },
        'aria-live': "polite",
    });
    // @ts-ignore
    [variantClass,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "text-sm font-semibold" },
    });
    (__VLS_ctx.message);
    // @ts-ignore
    [message,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "mt-2 h-1 w-full rounded-full bg-white/30 overflow-hidden" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        key: (__VLS_ctx.message + __VLS_ctx.type),
        ...{ class: "h-full bg-white progress-bar" },
        ...{ style: ({ animationDuration: props.duration + 'ms' }) },
    });
    // @ts-ignore
    [message, type,];
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-4']} */ ;
/** @type {__VLS_StyleScopedClasses['right-4']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-[240px]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-300']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-e-300']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/30']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-bar']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
