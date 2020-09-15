# FLY-11ty

Simple boilerplate for Static Site Generator <a href="https://www.11ty.dev/">eleventy</a> &mdash; build with webpack, tailwind, purgeCSS & postCSS

Demo: https://brachycera.github.io/fly-11ty/

## Features & Tools

- Layout with [Tailwind](https://tailwindcss.com/)
- ServiceWorker with [Workbox](https://developers.google.com/web/tools/workbox/)
- RSS Feed
- Sitemap for SEO
- Metatags
- Article Tags
- Pagination
- [Syntax Highlighting](https://github.com/11ty/eleventy-plugin-syntaxhighlight)
- BrowserSync
- Babel

## Installation

Clone or copy the project and run `npm install`.

## Configuration

### Eleventy

Open the 11ty configuration file `.eleventy.js` and change the values to your likening.

#### "Default Values" for Meta/SEO Tags

Meta/SEO Tags for title, description, image, twitter etc. will be automatically created with https://github.com/artstorm/eleventy-plugin-seo

```javascript
    let options = {
        ...
        ...
        title: 'Add custom HTML (Meta) Title',
        description: 'Add custom HTML meta description',
        url: 'https://www.XXX.XX',
        author: 'XXX',
        twitter: 'XXX',
        image: 'https://www.XXX.XX/default_image.png'
    };
```

#### RSS Feed Configuration

Configure the RSS Feed information in `/src/feed.njk` - https://github.com/11ty/eleventy-plugin-rss

```javascript
    "metadata": {
        "title": "My RSS feed",
        "subtitle": "XXX",
        "url": "https://www.XXX.XX/",
        "feedUrl": "https://www.XXX.XX/feed.xml",
        "author": {
            "name": "XXX",
            "email": "XXX@XXX.XX"
        }
    }
```

#### BrowerSync Settings

Change the settings for [browsersync.io](http://browsersync.io) as needed.

```javascript
    eleventyConfig.setBrowserSyncConfig({
        ...
        host: 'localhost',
        server: false,
        proxy: 'localhost',
        port: 8080,
        ...
    });
```

#### Assets

 In case any assets like images, web-fonts, etc. needs to be copied from `src` to `dist`.

```javascript
    /**********************************
     *        Copy Assets
     **********************************/

    eleventyConfig.addPassthroughCopy('src/img');
    eleventyConfig.addPassthroughCopy('src/blog/img');

    ...
```
### Tools
Besides from `.eleventy.js` there a some more configuration files:
- `postcss.config.js`
- `tailwind.config.js`
- `webpack.config.js`
- `workbox.config.js`



## Content

All Content files are in the `src` folder. The supported formats are `md`, `njk` or `html`.

Three `eleventy` commands are available `debug`, `watch` and `serve` - https://www.11ty.dev/docs/usage/

```bash
$ npm run eleventy:debug
```

```bash
$ npm run eleventy:watch
```

```bash
$ npm run eleventy:serve
```

**Example-File: `src/blog/myBlogPost.md`**

```html
---
date: 2020-08-15
title: "My First Blog Post"
permalink: "blog//{{ page.date | date: '%Y' }}/{{ title | slug }}/index.html"
excerpt: "This should be an excerpt"
tags: [ movie, films ]
---

<h1>
    <a href="{{ page.url }}">{{ title }}</a>
</h1>

**{{ excerpt }}**

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua.
```

## Development

There are three `npm` commands for creating a Layout or a production build.

```bash
$ npm run build
```

```bash
$ npm run dev
```

```bash
$ npm run dev:watch
```

- PostCSS
    - cssnano
    - tailwind
    - autoprefixer
    - purgecss
- Babel
- minify HTML/JS/CSS
- BrowserSync
- WorkBox (ServiceWorker)

### Layout

Template files for the Layout can be found in the `_includes/layout/`

CSS files are in `src/css`

JS files are in `src/js`

