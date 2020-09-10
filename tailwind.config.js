/*!
 *  FLY-11ty tailwind configuration
 */

module.exports = {
    purge: false,
    theme: {
        extend: {
            colors: {
            }
        },
        borderColor: (theme) => ({
            ...theme('colors')
        })
    }
};
