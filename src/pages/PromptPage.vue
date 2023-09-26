
<template>
  <q-page class="q-pa-md">
    <h5>Prompt</h5>
    <div>
      <pre>
      {{currentPrompt}}
    </pre>
    </div>
    <div>
      <q-input
        v-model="promptQuestion"
        filled
        class="q-py-md"
        type="textarea"
      />
      <div>
        <q-checkbox v-model="useContext" label="Use context" />
      </div>
      <div>
        <q-btn @click="ask">{{ useContext ? 'Ask OpenAI (with context)' :  'Ask OpenAI'}}</q-btn>
      </div>
    </div>
    <h5>Answer</h5>
    <pre>{{ response }}</pre>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, ref,computed } from 'vue';
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'PromptPage',
  setup () {
    const $q = useQuasar()
    const promptQuestion = ref()
    const useContext = ref(false)
    const response = ref()
    const currentPrompt = computed( () => {
      let prefix;
      let suffix;
      if(useContext.value) {
        prefix = 'With the given context, answer the question. If you do not know the answer, say "I do not know".'
      } else {
        prefix = 'Answer the question. If you do not know the answer, say "I do not know".'
      }


      if(!!promptQuestion.value) {
        if(useContext.value){
          // eslint-disable-next-line quotes
          suffix = `Do not make up answers\nContext:{context}\nQuestion:{${promptQuestion.value}}` 
        } else {
          // eslint-disable-next-line quotes
          suffix = `Do not make up answers\nQuestion:{${promptQuestion.value}}` 
        }
      }
      else {
        if(useContext.value){
          // eslint-disable-next-line quotes
          suffix = `Do not make up answers\nContext:{context}\nQuestion:{question}` 
        } else {
          suffix = 'Do not make up answers\nQuestion:{question}' 
        }
      }

      return prefix+suffix;
    })

    const ask = async () => {
      response.value = '';
      if(!promptQuestion.value) {
        return $q.notify({
          type: 'negative',
          message: 'Please input string'
        })
      }

      const form = new FormData()
      form.append('vendor', 'openai')
      form.append('text', promptQuestion.value)

      if(useContext.value) {
        form.append('with_context', 'true')
      }
     
      await api.post('/prompt', form).then((res) => {
        response.value = res.data.result
        // $q.notify({
        //   type: 'positive',
        //   message: 'Successfully added'
        // })
      })
    }

    return {
      currentPrompt,
      promptQuestion,
      useContext,
      response,
      ask
    }
  }
});
</script>
<style>
  pre {
    white-space: -moz-pre-wrap; /* Mozilla, supported since 1999 */
    white-space: -pre-wrap; /* Opera */
    white-space: -o-pre-wrap; /* Opera */
    white-space: pre-wrap; /* CSS3 - Text module (Candidate Recommendation) http://www.w3.org/TR/css3-text/#white-space */
    word-wrap: break-word;
  }
</style>