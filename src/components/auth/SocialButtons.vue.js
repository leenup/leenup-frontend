import Button from '@/components/ui/Button.vue';
import { useAuthProviders } from '@/composables/useAuthProviders';
import { useAnalytics } from '@/composables/useAnalytics';
import { computed } from 'vue';
const { loginWithEmail, loginWithGoogle } = useAuthProviders();
const { track } = useAnalytics();
const stackClass = computed(() => 'flex flex-col md:flex-row md:items-center md:gap-3 gap-3');
const onEmail = () => { track('login_email_clicked'); loginWithEmail(); };
const onGoogle = () => { track('login_google_clicked'); loginWithGoogle(); };
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: (__VLS_ctx.stackClass) },
});
// @ts-ignore
[stackClass,];
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    variant: "primary",
    ...{ class: "w-full font-sans typography-button" },
}));
const __VLS_1 = __VLS_0({
    ...{ 'onClick': {} },
    variant: "primary",
    ...{ class: "w-full font-sans typography-button" },
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
const __VLS_5 = ({ click: {} },
    { onClick: (__VLS_ctx.onEmail) });
const { default: __VLS_6 } = __VLS_2.slots;
// @ts-ignore
[onEmail,];
var __VLS_2;
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    variant: "white",
    ...{ class: "w-full flex items-center justify-center gap-2 font-sans typography-button" },
}));
const __VLS_8 = __VLS_7({
    ...{ 'onClick': {} },
    variant: "white",
    ...{ class: "w-full flex items-center justify-center gap-2 font-sans typography-button" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
let __VLS_10;
let __VLS_11;
const __VLS_12 = ({ click: {} },
    { onClick: (__VLS_ctx.onGoogle) });
const { default: __VLS_13 } = __VLS_9.slots;
// @ts-ignore
[onGoogle,];
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "@/assets/brand/icons/google.svg",
    alt: "",
    ...{ class: "h-5 w-5" },
    'aria-hidden': "true",
});
var __VLS_9;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['typography-button']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['typography-button']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
