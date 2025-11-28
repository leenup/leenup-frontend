import OnboardingCarousel from '@/components/onboarding/OnboardingCarousel.vue';
import IconUser from '@/components/icons/IconHome.vue';
import IconCoucou from '@/components/icons/IconCoucou.vue';
import BackButton from '@/components/common/BackButton.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useOnboardingStore } from '@/stores/onboarding';
const router = useRouter();
const onboardingStore = useOnboardingStore();
const goBack = () => router.back();
const selectedRole = ref(null);
onMounted(() => {
    onboardingStore.loadFromStorage();
    selectedRole.value = onboardingStore.role;
});
const selectRole = (role) => {
    selectedRole.value = role;
    onboardingStore.setRole(role);
};
const startFlow = () => {
    if (selectedRole.value === 'leener') {
        router.push({ name: 'onboarding-leener' });
    }
    else if (selectedRole.value === 'mentor') {
        router.push({ name: 'onboarding-mentor' });
    }
    else {
        router.push({ name: 'auth' });
    }
};
const slides = [
    {
        title: 'Simple & Rapide',
        description: 'Que tu sois mentor ou apprenant, créé ton profil leener en moins de 5 minutes !',
        image: new URL('@/assets/onboarding/slide-1.png', import.meta.url).toString(),
    },
    {
        title: 'Découvre & progresse',
        description: 'Développes de nouvelles compétences et suis ta progression pas à pas !',
        image: new URL('@/assets/onboarding/slide-2.png', import.meta.url).toString(),
    },
    {
        title: 'Reçois & partages',
        description: 'Tu peux être à la fois un leener mentor et un leener apprenant, les 2 sont possible !',
        image: new URL('@/assets/onboarding/slide-3.png', import.meta.url).toString(),
    },
    {
        title: 'Et amuse toi !',
        description: "Pendant toute ta progression, gagne des cartes et débloques des crédits !",
        image: undefined,
    }
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
    ...{ class: "min-h-screen bg-surface-bg text-primary-600" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mx-auto flex max-w-3xl flex-col gap-8 px-6 py-8" },
});
__VLS_asFunctionalElement(__VLS_elements.header, __VLS_elements.header)({
    ...{ class: "flex items-center justify-start" },
});
/** @type {[typeof BackButton, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(BackButton, new BackButton({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "grid items-center gap-6 md:grid-cols-[auto,1fr]" },
});
/** @type {[typeof IconCoucou, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(IconCoucou, new IconCoucou({
    ...{ class: "h-20 w-20 text-support-orange" },
}));
const __VLS_5 = __VLS_4({
    ...{ class: "h-20 w-20 text-support-orange" },
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "rounded-400 bg-surface-panel px-4 py-3 text-left text-primary-600 shadow-e-100" },
});
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "flex flex-col items-center gap-4" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "text-center font-sans h1 font-bold leading-tight" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "w-full max-w-3xl" },
});
/** @type {[typeof OnboardingCarousel, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(OnboardingCarousel, new OnboardingCarousel({
    slides: (__VLS_ctx.slides),
}));
const __VLS_9 = __VLS_8({
    slides: (__VLS_ctx.slides),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
// @ts-ignore
[slides,];
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "grid gap-6 md:grid-cols-[1fr,auto] md:items-center" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "font-sans font-bold rounded-400 bg-surface-panel px-4 py-3 shadow-e-100" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "font-sans font-extrabold" },
});
/** @type {[typeof IconCoucou, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(IconCoucou, new IconCoucou({
    ...{ class: "h-20 w-20 text-support-orange -scale-x-100" },
}));
const __VLS_13 = __VLS_12({
    ...{ class: "h-20 w-20 text-support-orange -scale-x-100" },
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "rounded-400 bg-primary-600 px-6 py-10 text-center text-surface-button shadow-e-300" },
});
__VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
    ...{ class: "text-2xl font-bold" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "mt-2 text-base text-surface-button/80" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "font-sans font-extrabold" },
});
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "font-sans font-extrabold" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mt-8 flex flex-col gap-4" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.selectRole('leener');
            // @ts-ignore
            [selectRole,];
        } },
    ...{ class: "flex items-center justify-center gap-3 rounded-400 px-6 py-4 text-base font-semibold transition" },
    ...{ class: (__VLS_ctx.selectedRole === 'leener'
            ? 'bg-cta-500 text-surface-button shadow-e-300'
            : 'bg-surface-panel text-primary-600 shadow-e-200 hover:bg-secondary-500') },
    'aria-pressed': (__VLS_ctx.selectedRole === 'leener'),
});
// @ts-ignore
[selectedRole, selectedRole,];
/** @type {[typeof IconUser, ]} */ ;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(IconUser, new IconUser({
    ...{ class: "h-5 w-5" },
}));
const __VLS_17 = __VLS_16({
    ...{ class: "h-5 w-5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.selectRole('mentor');
            // @ts-ignore
            [selectRole,];
        } },
    ...{ class: "flex items-center justify-center gap-3 rounded-400 px-6 py-4 text-base font-semibold transition" },
    ...{ class: (__VLS_ctx.selectedRole === 'mentor'
            ? 'bg-cta-500 text-surface-button shadow-e-300'
            : 'bg-surface-panel text-primary-600 shadow-e-200 hover:bg-secondary-500') },
    'aria-pressed': (__VLS_ctx.selectedRole === 'mentor'),
});
// @ts-ignore
[selectedRole, selectedRole,];
/** @type {[typeof IconUser, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(IconUser, new IconUser({
    ...{ class: "h-5 w-5" },
}));
const __VLS_21 = __VLS_20({
    ...{ class: "h-5 w-5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "grid gap-6 md:grid-cols-[auto,1fr] md:items-center" },
});
/** @type {[typeof IconCoucou, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(IconCoucou, new IconCoucou({
    ...{ class: "h-20 w-20 text-support-orange" },
}));
const __VLS_25 = __VLS_24({
    ...{ class: "h-20 w-20 text-support-orange" },
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "rounded-400 bg-surface-panel px-4 py-3 text-primary-600 shadow-e-100" },
});
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "flex justify-center pb-8" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.startFlow) },
    ...{ class: "w-full max-w-md rounded-400 px-6 py-3 text-surface-button shadow-e-300 transition" },
    ...{ class: (__VLS_ctx.selectedRole ? 'bg-cta-600 hover:bg-primary-700' : 'bg-secondary-500 text-primary-600 opacity-60 cursor-not-allowed') },
    disabled: (!__VLS_ctx.selectedRole),
});
// @ts-ignore
[selectedRole, selectedRole, startFlow,];
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-surface-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-8']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-[auto,1fr]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-20']} */ ;
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
/** @type {__VLS_StyleScopedClasses['text-support-orange']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-400']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-surface-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-e-100']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['h1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-[1fr,auto]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-400']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-surface-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-e-100']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['h-20']} */ ;
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
/** @type {__VLS_StyleScopedClasses['text-support-orange']} */ ;
/** @type {__VLS_StyleScopedClasses['-scale-x-100']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-400']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-surface-button']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-e-300']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['text-surface-button/80']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-400']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-400']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-[auto,1fr]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['h-20']} */ ;
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
/** @type {__VLS_StyleScopedClasses['text-support-orange']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-400']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-surface-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-e-100']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-400']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-surface-button']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-e-300']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
