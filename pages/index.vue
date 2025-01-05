<template>
  <div class="wrapperSite">
    <Entete/>
    <StyleSheet/>
    <ArticleElem
      titreElem="Yllan SUTTER"
      contenuElem="Créateur de sites internet"
    />

    <div>
      <h1>Contenu du fichier JSON :</h1>
      <ul>
        <li v-for="(item, index) in jsonData" :key="index">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import StyleSheet from '~/components/StyleSheet';
import ArticleElem from '~/components/article';
import Entete from '~/components/entete';
import axios from 'axios';

export default {
  components: {
    StyleSheet,
    ArticleElem,
    Entete
  },
  data() {
    return {
      jsonData: [],
      isActive: false,
      lists: ["Vue", "Angular", "React"]
    };
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3001'); // Modifier l'URL si nécessaire
      this.jsonData = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données JSON :', error);
    }
  },
  methods: {
    randomNumber() {
      var size = this.lists.length;
      var elem = Math.floor(Math.random() * (size - 1 + 1)) + 0;
      var ElemFinal = this.lists[elem];
      this.lists.splice(elem, 1);
      return ElemFinal;
    },
    affichage() {
      this.isActive = !this.isActive;
    },
    shuffleArray() {
      this.lists = this.shuffle(this.lists);
    },
    shuffle(array) {
      let currentIndex = array.length,
        randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
      return array;
    }
  }
};
</script>
