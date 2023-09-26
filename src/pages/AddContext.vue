<template>
  <div class="flex column q-pa-md">
    <h6>Add demo context</h6>
    <div>
      <ul>
        <li>Use text area below to add more texts into DB</li>
        <li>The vectors, if a similarity is found within the PROMPT, will add the text into prompt as a "context "block </li>
        <li>This is good for data unknown yet by the time the LLM was trained</li>
      </ul>
    </div>
    <div>
      <q-input
        v-model="text"
        filled
        class="q-py-md"
        type="textarea"
      />
      <q-btn @click="addContext">Add more context</q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'AddContext',
  components: {
  },
  setup () {
    const $q = useQuasar()
    const text = ref()

    const addContext = async () => {
      if(!text.value) {
        return $q.notify({
          type: 'negative',
          message: 'Please input string'
        })
      }

      const form = new FormData()
      form.append('vendor', 'openai')
      form.append('text', text.value)
     
      await api.post('/add_to_store', form).then(() => {
        $q.notify({
          type: 'positive',
          message: 'Successfully added'
        })
        text.value = ''
      })
    }

     return {
      text,
      addContext
    }
  }
});
</script>

