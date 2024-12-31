<template> 
  <div class="game-item"  @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <img v-if="game.img_icon_url" :src="gameIconUrl" :alt="game.name" class="game-icon" lazy>        
    <span class="hovered" >{{ game.name }}</span><span v-if="showTitle">{{ game.name }} </span><span v-if="showHeures"> {{ formatHours(game.playtime_forever) }}</span>
    <button @click="fetchGGDealsData" class="p-2 bg-green-500 text-white mt-2">
      Obtenir les prix GG.deals
    </button>
  </div>
</template>
  
  <script>
  import axios from 'axios';

  export default {
    data(){
        return{
            isHovered: false,
        }
    },
    props: {
      game: {
        type: Object,
        required: true
      },
      showTitle: {
        type: Boolean,
        default: true
      },
      showHeures: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      getGameIconUrl(appid, iconHash) {
        // return `http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${iconHash}.jpg`;
        
        return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`;
      },
      formatHours(minutes) {
        return Math.round(minutes / 60) + 'h';
      },
      async fetchGGDealsData() {
        try {
          const response = await axios.get(`/api/ggdeals/games/${this.game.appid}/prices`);
          // Traiter et afficher les données reçues
          this.game.ggDealsData = response;
          // Émettre un événement pour informer le composant parent
          this.$emit('ggdeals-data-updated', this.game);
        } catch (error) {
          console.error('Erreur lors de la récupération des données GG.deals:', error);
        }
      }
    },
    computed: {
        gameIconUrl() {
            return this.getGameIconUrl(this.game.appid, this.game.img_icon_url);
        }
    }
  }
  </script>
  