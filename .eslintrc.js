module.exports = {
    extends: [
      "@nuxt/eslint-config", // Официальный конфиг Nuxt
      "plugin:prettier/recommended" // Интеграция Prettier
    ],
    rules: {
      "vue/multi-word-component-names": "off" // Разрешает однословные компоненты (например, `index.vue`)
    }
  }