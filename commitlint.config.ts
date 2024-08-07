module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "design",
        "docs",
        "style",
        "refactor",
        "test",
        "build",
        "chore",
        "hotfix",
        "deploy",
        "remove",
      ],
    ],
  },
};
