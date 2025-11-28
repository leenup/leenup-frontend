import { computed } from 'vue';
const props = withDefaults(defineProps(), {});
const model = defineModel();
const uid = computed(() => props.id ?? `rad-${Math.random().toString(36).slice(2, 9)}`);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
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
    type: "radio",
    ...{ class: "h-4 w-4 rounded-full border-primary-300 text-primary-600 focus:ring-secondary-200" },
    name: (__VLS_ctx.name),
    value: (__VLS_ctx.value),
});
(__VLS_ctx.model);
// @ts-ignore
[uid, name, value, model,];
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "cursor-pointer" },
    for: (__VLS_ctx.uid),
});
// @ts-ignore
[uid,];
var __VLS_0 = {};
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['select-none']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary-300']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-secondary-200']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
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
