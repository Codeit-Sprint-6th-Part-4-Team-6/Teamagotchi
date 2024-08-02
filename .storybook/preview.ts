import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        {
          name: "dark",
          value: "#0F172A",
        },
        {
          name: "light",
          value: "#fff",
        },
      ],
      default: "dark",
    },
  },
};

export default preview;
