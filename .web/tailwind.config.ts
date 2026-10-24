import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7f7f7",
          100: "#ededed",
          200: "#dcdcdc",
          300: "#bdbdbd",
          400: "#989898",
          500: "#767676",
          600: "#5a5a5a",
          700: "#424242",
          800: "#2a2a2a",
          900: "#161616",
        },
      },
      fontFamily: {
        serif: [
          "Georgia",
          "'Hiragino Mincho ProN'",
          "'Yu Mincho'",
          "serif",
        ],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "#2a2a2a",
            "--tw-prose-headings": "#161616",
            "--tw-prose-links": "#161616",
            "--tw-prose-bold": "#161616",
            "--tw-prose-counters": "#5a5a5a",
            "--tw-prose-bullets": "#989898",
            "--tw-prose-hr": "#dcdcdc",
            "--tw-prose-quotes": "#424242",
            "--tw-prose-quote-borders": "#dcdcdc",
            "--tw-prose-code": "#161616",
            "--tw-prose-pre-code": "#ededed",
            "--tw-prose-pre-bg": "#2a2a2a",
            "--tw-prose-th-borders": "#bdbdbd",
            "--tw-prose-td-borders": "#dcdcdc",
            maxWidth: "none",
            a: {
              textDecoration: "underline",
              fontWeight: "400",
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
