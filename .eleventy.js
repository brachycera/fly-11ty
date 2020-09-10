const { DateTime } = require('luxon');
const htmlmin = require('html-minifier');
const markdownIt = require('markdown-it');
const pluginSEO = require('eleventy-plugin-seo');
const markdownItAttrs = require('markdown-it-attrs');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
module.exports = (eleventyConfig) => {

    /**********************************
     *         Default Values
     **********************************/

    let options = {
        dir: {
            input: 'src',
            output: 'dist',
            includes: '../_includes',
            data: '../_data',
            layouts: '../_includes/layout',
            templateFormats: ['njk', 'md', 'html']
        },
        title: 'Add custom HTML (Meta) Title',
        description: 'Add custom HTML meta description',
        url: 'https://www.XXX.XX',
        author: 'XXX',
        twitter: 'XXX',
        image: 'https://www.XXX.XX/default_image.png'
    };

    /**********************************
     *          Collections
     **********************************/

    eleventyConfig.addCollection('tagsList', (collection) => {

            const tagSet = new Set();

            collection.getAll().forEach((item) => {

                if ('tags' in item.data) {

                    let { tags } = item.data;

                    tags = tags.filter((tag) => {

                        switch (tag) {

                        case 'all':
                        case 'blog':
                        case 'tagsList':
                            return false;

                        default:
                            return true;

                        }

                    });

                    for (const tag of tags) {

                        tagSet.add(tag);

                    }

                }

            });

            return [...tagSet];

        }

    );

    eleventyConfig.addCollection('blogPosts', function(collection) {
        return collection.getFilteredByGlob('./src/blog/**/*');
    });

    /**********************************
     *          Filter
     **********************************/

    // @link https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    // Example: 2009-01-12T07:32
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj).toISO();
    });

    eleventyConfig.addFilter('articleDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj).toFormat('dd MMMM yyyy');
    });

    // {{ date | outOfDate }} can be used in tpl to figure out if the article is older then X (e.g. 2) years
    eleventyConfig.addFilter('outOfDate', (dateObj) => {
        return DateTime.fromJSDate(dateObj, 'dd.MM.yyyy').diffNow('years').toObject().years < -2;
    });

    /**********************************
     *          Tranformers
     **********************************/

    eleventyConfig.addTransform('htmlmin', (content, outputPath) => {

        if (outputPath.endsWith('.html') && process.env.ELEVENTY_ENV === 'production') {

            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true
            });

            return minified;

        }

        return content;

    });

    /**********************************
     *        11tny Settings
     **********************************/

    eleventyConfig.setBrowserSyncConfig({
        host: 'localhost',
        server: false,
        proxy: 'localhost',
        port: 8080,
        // notify: true,
        logSnippet: true,
        injectChanges: true,
        logLevel: 'info',
        files: ['../src/**']
    });

    eleventyConfig.setLibrary('md', markdownIt({
        html: true,
        breaks: true,
        linkify: true
    })
    .use(markdownItAttrs)
    );

    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        // Optional, default is "---"
        // excerpt_separator: "<!-- excerpt -->"
    });

    /**********************************
     *          Plugings
     **********************************/

    // @link https://github.com/artstorm/eleventy-plugin-seo
    eleventyConfig.addPlugin(pluginSEO, options);

    // @link https://github.com/11ty/eleventy-plugin-rss
    eleventyConfig.addPlugin(pluginRss);

    // @link https://github.com/11ty/eleventy-plugin-syntaxhighlight
    eleventyConfig.addPlugin(syntaxHighlight, {

        // Change which syntax highlighters are installed
        templateFormats: ["*"], // default

        // Or, just njk and md syntax highlighters (do not install liquid)
        // templateFormats: ["njk", "md"],

        // init callback lets you customize Prism
        init: function({ Prism }) {
            // Prism.languages.myCustomLanguage = /* */;
        },

        // Added in 3.0, set to true to always wrap lines in `<span class="highlight-line">`
        // The default (false) only wraps when line numbers are passed in.
        alwaysWrapLineHighlights: true

    });

    /**********************************
     *        Copy Assets
     **********************************/

    eleventyConfig.addPassthroughCopy('src/img');
    eleventyConfig.addPassthroughCopy('src/blog/img');
    // eleventyConfig.addPassthroughCopy('src/css/fonts');
    eleventyConfig.addPassthroughCopy('src/.htaccess');

    // Copy Manifest and fav/icons
    // eleventyConfig.addPassthroughCopy('src/android-chrome-192x192.png');
    // eleventyConfig.addPassthroughCopy('src/android-chrome-256x256.png');
    // eleventyConfig.addPassthroughCopy('src/apple-touch-icon.png');
    // eleventyConfig.addPassthroughCopy('src/browserconfig.xml');
    // eleventyConfig.addPassthroughCopy('src/favicon.ico');
    // eleventyConfig.addPassthroughCopy('src/favicon-16x16.png');
    // eleventyConfig.addPassthroughCopy('src/favicon-32x32.png');
    // eleventyConfig.addPassthroughCopy('src/mstile-150x150.png');
    // eleventyConfig.addPassthroughCopy('src/safari-pinned-tab.svg');
    // eleventyConfig.addPassthroughCopy('src/manifest.webmanifest');

    return options;

};
