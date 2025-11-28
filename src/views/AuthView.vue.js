import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BackButton from '@/components/common/BackButton.vue';
import ProgressBar from '@/components/common/ProgressBar.vue';
import IconCoucou from '@/components/icons/IconCoucou.vue';
import IconUser from '@/components/icons/IconHome.vue';
import { useAuthStore } from '@/stores/auth';
import Toast from '@/components/common/Toast.vue';
const router = useRouter();
const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');
let redirectTimer;
const translateError = (msg) => {
    if (!msg)
        return 'Une erreur est survenue. Merci de réessayer.';
    const normalized = msg.toLowerCase();
    if (normalized.includes('network'))
        return 'Connexion serveur impossible. Vérifie ta connexion ou réessaie plus tard.';
    if (normalized.includes('expired') || normalized.includes('jwt'))
        return 'Votre session a expiré, merci de vous reconnecter.';
    if (normalized.includes('invalid') || normalized.includes('bad credentials'))
        return 'Identifiants incorrects. Vérifiez votre email et votre mot de passe.';
    if (normalized.includes('unauthorized'))
        return 'Vous n’êtes pas autorisé. Merci de vous reconnecter.';
    return msg;
};
const onSubmit = async () => {
    errorMessage.value = '';
    successMessage.value = '';
    if (redirectTimer) {
        globalThis.clearTimeout(redirectTimer);
        redirectTimer = undefined;
    }
    try {
        await authStore.authenticate({ email: email.value, password: password.value });
        await authStore.fetchProfile();
        successMessage.value = 'Connexion réussie';
        redirectTimer = globalThis.setTimeout(() => {
            // NOTE: router vers dashboard mentor si is_mentor true
            router.push({ name: 'dashboard-leener' });
        }, 5000);
    }
    catch (err) {
        const apiMessage = err?.response?.data?.message || err?.response?.data?.error || err?.message;
        errorMessage.value = translateError(apiMessage);
    }
};
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
    ...{ class: "mx-auto w-full max-w-3xl space-y-6" },
});
__VLS_asFunctionalElement(__VLS_elements.header, __VLS_elements.header)({
    ...{ class: "flex items-center gap-4" },
});
/** @type {[typeof BackButton, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(BackButton, new BackButton({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {[typeof ProgressBar, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(ProgressBar, new ProgressBar({
    value: (0.8),
}));
const __VLS_5 = __VLS_4({
    value: (0.8),
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "grid items-start gap-4 md:grid-cols-[auto,1fr]" },
});
/** @type {[typeof IconCoucou, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(IconCoucou, new IconCoucou({
    ...{ class: "h-20 w-20 text-primary-600" },
}));
const __VLS_9 = __VLS_8({
    ...{ class: "h-20 w-20 text-primary-600" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "font-sans text rounded-400 bg-surface-panel px-4 py-3 text-primary-600 shadow-e-100" },
});
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "text-center space-y-2" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "font-sans h2 font-bold" },
});
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
    ...{ class: "font-sans h3 text-primary-600" },
});
__VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
    ...{ onSubmit: (__VLS_ctx.onSubmit) },
    ...{ class: "space-y-4" },
});
// @ts-ignore
[onSubmit,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "space-y-2" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "email",
    required: true,
    placeholder: "monadresse@mail.com",
    ...{ class: "w-full rounded-300 border border-secondary-300 bg-white px-4 py-3 text-primary-600 shadow-e-100 focus:border-cta-500 focus:outline-none focus:ring-2 focus:ring-cta-200" },
});
(__VLS_ctx.email);
// @ts-ignore
[email,];
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "password",
    required: true,
    placeholder: "Mot de passe",
    ...{ class: "w-full rounded-300 border border-secondary-300 bg-white px-4 py-3 text-primary-600 shadow-e-100 focus:border-cta-500 focus:outline-none focus:ring-2 focus:ring-cta-200" },
});
(__VLS_ctx.password);
// @ts-ignore
[password,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    type: "submit",
    ...{ class: "flex w-full items-center justify-center gap-3 rounded-400 bg-primary-600 px-6 py-3 text-base font-semibold text-surface-button shadow-e-300 transition hover:bg-primary-700" },
});
/** @type {[typeof IconUser, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(IconUser, new IconUser({
    ...{ class: "h-5 w-5" },
}));
const __VLS_13 = __VLS_12({
    ...{ class: "h-5 w-5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    type: "button",
    ...{ class: "flex w-full items-center justify-center gap-3 rounded-400 bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-e-200 transition hover:bg-secondary-500" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: "@/assets/brand/icons/google.svg",
    alt: "Google",
    ...{ class: "h-5 w-5" },
});
if (__VLS_ctx.errorMessage) {
    // @ts-ignore
    [errorMessage,];
    /** @type {[typeof Toast, ]} */ ;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(Toast, new Toast({
        key: ('err-' + __VLS_ctx.errorMessage),
        message: (__VLS_ctx.errorMessage),
        type: "error",
    }));
    const __VLS_17 = __VLS_16({
        key: ('err-' + __VLS_ctx.errorMessage),
        message: (__VLS_ctx.errorMessage),
        type: "error",
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    // @ts-ignore
    [errorMessage, errorMessage,];
}
if (__VLS_ctx.successMessage) {
    // @ts-ignore
    [successMessage,];
    /** @type {[typeof Toast, ]} */ ;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(Toast, new Toast({
        key: ('ok-' + __VLS_ctx.successMessage),
        message: (__VLS_ctx.successMessage),
        type: "success",
    }));
    const __VLS_21 = __VLS_20({
        key: ('ok-' + __VLS_ctx.successMessage),
        message: (__VLS_ctx.successMessage),
        type: "success",
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    // @ts-ignore
    [successMessage, successMessage,];
}
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-surface-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-10']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-[auto,1fr]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-20']} */ ;
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['text']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-400']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-surface-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-e-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['h2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['h3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-300']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-secondary-300']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-e-100']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-cta-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-cta-200']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-300']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-secondary-300']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-e-100']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-cta-500']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-cta-200']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-400']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-surface-button']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-e-300']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-primary-700']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-400']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-600']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-e-200']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-secondary-500']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
