const CHAT_APP_URL = import.meta.env.VITE_CHAT_APP_URL
const CHAT_APP_TOKEN = import.meta.env.VITE_CHAT_APP_TOKEN

// Builds the Chat application URL for the logged-in Membership user.
// user_id / user_name are per-user; token is a fixed shared app token.
export const getChatUrl = (user) => {

    if (!CHAT_APP_URL || !CHAT_APP_TOKEN || !user?.id) {
        return null
    }

    const params = new URLSearchParams({
        user_id: user.id,
        user_name: user.full_name || '',
        token: CHAT_APP_TOKEN,
    })

    return `${CHAT_APP_URL}?${params.toString()}`
}
