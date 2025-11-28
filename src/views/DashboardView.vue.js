import { computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useGreeting } from '@/composables/useGreeting';
const authStore = useAuthStore();
const firstName = computed(() => authStore.user?.firstName ?? '');
const { greeting } = useGreeting();
onMounted(() => {
    if (!authStore.user) {
        authStore.fetchProfile().catch(() => { });
    }
});
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
    ...{ class: "mx-auto max-w-5xl space-y-4" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "text-3xl font-bold" },
});
(__VLS_ctx.greeting);
(__VLS_ctx.firstName || 'leener');
// @ts-ignore
[greeting, firstName,];
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "text-base text-primary-600" },
});
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-surface-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-10']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-5xl']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
