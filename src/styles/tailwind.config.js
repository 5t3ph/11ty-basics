module.exports = {
    purge: {
        content: ["public/**/*.html"],
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