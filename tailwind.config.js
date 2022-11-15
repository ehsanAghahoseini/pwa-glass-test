module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", ],
    theme: {
        extend: {
            colors: {
                'ehbi': {
                    100: '#FFD07F',
                    200: '#FDA65D',
                    300: '#FF8243',
                    400: '#E26A2C'
                },
                'gr': {
                    100: '#E7F5ED',
                    200: '#F5FFF9',
                    300: '#4DE58A',
                    400: '#FBF9F7'
                },
            },
            backgroundImage: {
                'bn1': "url('/assets/media/bn1.webp')",
                'bg-auth': "url('/assets/logo/bg-auth.png')",
                'seller': "url('/assets/logo/seller.png')",
                'shadow': "url('/assets/logo/shadow-bg.png')",
            }
        },
    },
    plugins: [],
}