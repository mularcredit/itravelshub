import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#63AB45",
                    50: "#f0f9eb",
                    100: "#ddf2d1",
                    200: "#bfe5a8",
                    300: "#9ad577",
                    400: "#7bc64d",
                    500: "#63AB45",
                    600: "#4d8b35",
                    700: "#3d6b2c",
                    800: "#335527",
                    900: "#2c4723",
                },
                emerald: {
                    50: "#f0fdf4",
                    100: "#dcfce7",
                    200: "#bbf7d0",
                    300: "#86efac",
                    400: "#4ade80",
                    500: "#22c55e",
                    600: "#16a34a",
                    700: "#15803d",
                    800: "#166534",
                    900: "#14532d",
                },
            },
            fontFamily: {
                sans: ["var(--font-plus-jakarta-sans)", "sans-serif"],
            },
        },
    },
    plugins: [],
    // Prevent conflicts with Bootstrap
    corePlugins: {
        preflight: false,
    },
};

export default config;
