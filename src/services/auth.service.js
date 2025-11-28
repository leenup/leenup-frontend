import { http } from '@/lib/http';
import { AUTH_CHANGE_PASSWORD_PATH, AUTH_EMAIL_URL, AUTH_GOOGLE_URL, AUTH_LOGIN_PATH, AUTH_ME_PATH, AUTH_REGISTER_PATH, } from '@/lib/env';
const authHeaders = (token) => ({ Authorization: `Bearer ${token}` });
export async function login(payload) {
    const { data } = await http.post(AUTH_LOGIN_PATH, payload, { withCredentials: true });
    return data;
}
export async function createAuthToken(payload) {
    const { data } = await http.post('/auth', payload, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        withCredentials: true,
    });
    return data;
}
export async function refreshAuthToken(payload) {
    const { data } = await http.post('/api/token/refresh', payload, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        withCredentials: true,
    });
    return data;
}
export async function register(payload) {
    const { data } = await http.post(AUTH_REGISTER_PATH, payload, {
        headers: {
            'Content-Type': 'application/ld+json',
            Accept: 'application/ld+json',
        },
    });
    return data;
}
export async function fetchProfile(token) {
    const { data } = await http.get(AUTH_ME_PATH, {
        headers: authHeaders(token),
    });
    return data;
}
export async function updateProfile(token, payload) {
    const { data } = await http.patch(AUTH_ME_PATH, payload, {
        headers: authHeaders(token),
    });
    return data;
}
export async function deleteAccount(token) {
    await http.delete(AUTH_ME_PATH, { headers: authHeaders(token) });
}
export async function changePassword(token, payload) {
    await http.post(AUTH_CHANGE_PASSWORD_PATH, payload, {
        headers: authHeaders(token),
    });
}
const resolveProviderUrl = (provider) => provider === 'email' ? AUTH_EMAIL_URL : AUTH_GOOGLE_URL;
export function redirectToProvider(provider) {
    const targetUrl = resolveProviderUrl(provider);
    globalThis.location.assign(targetUrl);
}
export const authProviders = {
    email: resolveProviderUrl('email'),
    google: resolveProviderUrl('google'),
};
