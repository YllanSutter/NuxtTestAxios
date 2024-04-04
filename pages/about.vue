<template>
  <div>
    <Entete/>
    <StyleSheet/>
    <h1>Hello Nuxters! 👋</h1>
    <p>
      This page is rendered on the <strong>{{ rendering }}</strong>
    </p>
    <p v-if="rendering === 'server'">
      First load or hard refresh is done on server side.
    </p>
    <p v-if="rendering === 'client'">Navigation is done on client side.</p>
    <ul>
      <li>Refresh the page for server side rendering.</li>
      <li>Click the links to see client side rendering.</li>
    </ul>

  </div>
</template>
<script>
  import StyleSheet from '~/components/StyleSheet';
  import ArticleElem from '~/components/article';
  import Entete from '~/components/entete';
export default {
  components:{
      StyleSheet,
      Entete
    },
  asyncData() {
    return {
      rendering: process.server ? 'server' : 'client'
    }
  }
}
</script>