<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Vue Template
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <LeftPanel />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import LeftPanel from 'src/components/left-panel.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MainLayout',
    components: { LeftPanel },
    setup() {
        return {};
    },
});
</script>

<style lang="scss" scoped>

</style>
