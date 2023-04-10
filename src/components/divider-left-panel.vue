<template>
  <div class="row items-center">
    <div class="separator col" />
    <div class="col-auto q-mx-md text-primary text-bold">
      {{ label }}
    </div>
    <div class="separator col-1" />
  </div>
</template>

<script lang="ts">import { defineComponent } from 'vue';

export default defineComponent({
    name: 'DividerLeftPanel',
    props: {
        label: {
            type: String,
            required: true,
        },
    },
    setup() {
        return {};
    },
});
</script>

  <style scoped lang="scss">
  .separator {
      background: $orange-2;
      height: 1px;
  }
  </style>
