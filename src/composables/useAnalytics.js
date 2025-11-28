export function useAnalytics() {
    const track = (event, payload) => {
        // console.log ou Hook vers Matomo/GA4 plus tard
    };
    return { track };
}
