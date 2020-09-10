/*!
 *  FLY-11ty workbox configuration
 */
module.exports = {
    cacheId: 'FLY-11ty',
    globDirectory: './dist',
    globPatterns: [
        '**/*.{css,js,woff2,ico}',
        'index.html'
    ],
    swDest: './dist/sw.js',
    // modifyURLPrefix: {
    //     '': '/'
    // },
    clientsClaim: true,
    skipWaiting: true,
    ignoreURLParametersMatching: [/./],
    sourcemap: JSON.stringify(process.env.NODE_ENV) === '"development"',
    maximumFileSizeToCacheInBytes: (JSON.stringify(process.env.NODE_ENV) === '"development"' ? 5 : 2) * 1024 * 1024,
    runtimeCaching: [
        {
            urlPattern: /(?:\/)$/,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'flyweb-html',
                expiration: {
                    maxAgeSeconds: 60 * 60 * 24 * 7,
                }
            }
        },
        {
            urlPattern: /.(?:png|jpg|jpeg|gif|bmp|webp|svg)$/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'flyweb-images',
                expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                }
            }
        }
    ]
};
