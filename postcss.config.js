const cssnano = require('cssnano');
const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {

    plugins: [
        tailwind,
        autoprefixer,
        process.env.NODE_ENV === 'production'
            ? purgecss({
                content: ['./dist/**/*.html'],
                defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || []
            })
            : false,
        process.env.NODE_ENV === 'production' ? cssnano : false
    ]

};
