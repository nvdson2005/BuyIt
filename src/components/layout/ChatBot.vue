<script lang="ts" setup>
import { onMounted } from "vue";

onMounted(() => {
  // inject v3 loader
  const injectScript = document.createElement("script");
  injectScript.src = "https://cdn.botpress.cloud/webchat/v3.4/inject.js";
  injectScript.id = "bp-inject-script";
  document.body.appendChild(injectScript);

  // inject bot config (unique for your bot)
  const configScript = document.createElement("script");
  configScript.src = "https://files.bpcontent.cloud/2025/12/07/06/20251207063844-POCTR7BA.js";
  configScript.defer = true;
  configScript.id = "bp-config-script";
  document.body.appendChild(configScript);
});
</script>

<template>
  <div></div>
</template>
