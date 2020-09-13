const { base } = require('../.eleventy').options;

module.exports = () => ({
    environment: process.env.ELEVENTY_ENV,
    base
});
