/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_AUTH_LOGIN_PATH?: string
  readonly VITE_AUTH_ME_PATH?: string
  readonly VITE_AUTH_EMAIL_PATH?: string
  readonly VITE_AUTH_GOOGLE_PATH?: string
  readonly VITE_AUTH_REGISTER_PATH?: string
  readonly VITE_AUTH_CHANGE_PASSWORD_PATH?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}