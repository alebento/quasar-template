<template>
  <q-drawer
    v-model="leftDrawerOpen"
    show-if-above
    bordered
    :width="350"
  >
    <div class="column fit">
      <div class="col-auto row items-center justify-center q-mt-md">
        <img
          src="../assets/no-image.jpg"
          alt="Logo"
          width="200"
        >
      </div>
      <DividerLeftPanel class="col-auto q-mt-md" label="Navigation" />
    </div>
  </q-drawer>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { useToggle } from 'src/utils/composables';
import {
    defineComponent,
} from 'vue';
import DividerLeftPanel from './divider-left-panel.vue';

export default defineComponent({
    name: 'MissionLeftPanel',
    components: {
        DividerLeftPanel,
    },
    setup() {
        const { toggle, value: leftDrawerOpen } = useToggle(true);

        return {
            leftDrawerOpen,
            toggle,
        };
    },
});
</script>

<style scoped lang="scss">
</style>
