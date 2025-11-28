import { designTokens } from '@/theme/tokens';
const shadowClasses = {
    e100: 'shadow-e-100',
    e200: 'shadow-e-200',
    e300: 'shadow-e-300',
    e400: 'shadow-e-400',
    e500: 'shadow-e-500',
};
export function useBrand() {
    return {
        colors: designTokens.colors,
        radius: designTokens.radii,
        shadows: shadowClasses,
    };
}
