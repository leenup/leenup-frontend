import { computed } from 'vue';
const props = withDefaults(defineProps(), {});
const model = defineModel({ default: false });
const uid = computed(() => props.id ?? `tgl-${Math.random().toString(36).slice(2, 9)}`);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaultModels = {
    'modelValue': false,
};
const __VLS_modelEmit = defineEmits();
const __VLS_defaults = {};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "inline-flex items-center gap-2 select-none" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    id: (__VLS_ctx.uid),
    type: "checkbox",
    ...{ class: "peer sr-only" },
});
(__VLS_ctx.model);
// @ts-ignore
[uid, model,];
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    for: (__VLS_ctx.uid),
    ...{ class: "relative inline-flex items-center cursor-pointer" },
});
// @ts-ignore
[uid,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "h-6 w-10 rounded-200 bg-primary-200 peer-checked:bg-primary-600 transition-all block" },
    'aria-hidden': "true",
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "absolute left-1 top-1 h-4 w-4 rounded-full bg-white peer-checked:translate-x-4 transition-transform" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "ml-2" },
});
var __VLS_0 = {};
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['peer']} */ ;
/** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-200']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary-200']} */ ;
/** @type {__VLS_StyleScopedClasses['peer-checked:bg-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-1']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['peer-checked:translate-x-4']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0;
[__VLS_dollars.$attrs,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
