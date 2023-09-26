<template>
  <div class="flex column q-pa-md">
    <h6>Demo contents</h6>
    <p>
      <ul>
        <li>
          Interface with OpenAI
        </li>
        <li>
          Interface with OpenAI + contexts (using RAG)
        </li>
      </ul>
    </p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';

export default defineComponent({
  name: 'ExampleComponent',
  setup () {
    return {}
  },
});
</script>
