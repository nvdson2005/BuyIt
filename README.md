# buyit

## UPDATE 26/10: TUTORIAL FOR INTEGRATING CHATBOT API WITH THE CHATBOT COMPONENT

The component used for the Chatbot interface lies in `/src/components/layout/ChatBot.vue`

Elements that should be noticed:

- `messages`: Representing the message flow. This is an object array, containing two attributes: `from` for the sender information, `text` for the content of the message.

- `input`: A state variable, representing the current input that user types in.

- `sendMessage()`: The function used to send the request to the chatbot. Modify this to integrate with the chatbot.

In the `sendMessage()` function, two things should be done to integrate successfully:

- Send the content inside the `input` variable to chatbot.

- Replace the `setTimeOut` function with the response from the chatbot:

```
  // Simulate bot reply, remove when integrating with real backend
    setTimeout(() => {
      messages.value.push({
        from: 'bot',
        text: 'Thank you for your message! We will assist you as soon as possible.',
      })
    }, 800)
```

#

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
