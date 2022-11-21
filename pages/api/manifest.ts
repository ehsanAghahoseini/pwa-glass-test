export default function handler(req: any, res: any) {

    res.send( `{
        "name": "optics4less",
        "short_name": "optics4less",
        "scope":"/",
        "start_url":"/",
        "icons": [
            {
                "src": "assets/favicon/android-chrome-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "assets/favicon/android-chrome-512x512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose":"any maskable"
            }
        ],
        "theme_color": "#ffffff",
        "background_color": "#ffffff",
        "display": "standalone"
    }`
    
    );
}