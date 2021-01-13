module.exports = {
    purge: {
        content: ["_inclues/**/*.html"],
        options: {
            safelist: [],
        },
    },
    theme: {
        extend: {
            colors: {
                change: "transparent",
            }
        },
    },
    variants: {},
    plugins: [],
};