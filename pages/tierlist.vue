<template>
  <div>
    <Entete/>
    <StyleSheet/>
    
    <!-- Boutons de tri -->
    <div class="noborder p-5 justify-center max-w-screen-2xl mx-auto p-5 text-white grid grid-cols-2 gap-4" v-if="games"> 
      <button class="p-5 bg-gray-900" @click="sortByGameName">Trier par nom</button>
      <button class="p-5 bg-gray-900" @click="sortByPlaytime">Trier par heures jouées</button>
      <!-- Ajoutez d'autres boutons pour d'autres critères de tri si nécessaire -->
    </div>

    <div class="noborder p-5 justify-center max-w-screen-2xl mx-auto p-5 text-white grid grid-cols-4 gap-4" v-if="games"> 
      <div v-for="game in games" :key="game.appid" class="game-item">
        <img v-if="game.img_icon_url" :src="getGameIconUrl(game.appid, game.img_icon_url)" :alt="game.name" class="game-icon">
        <span>{{ game.name }} : {{ formatHours(game.playtime_forever) }}</span>
      </div>
    </div>
    <p v-else>Chargement...</p>

  </div>
</template>

<script>
import StyleSheet from '~/components/StyleSheet';
import Entete from '~/components/Entete';

export default {
  data() {
    return {
      games: null,
      sortBy: 'name', // Critère de tri par défaut
      sortDesc: false // Ordre de tri par défaut (ascendant)
    }
  },
  async mounted() {
    try {
      const steamID = '76561198121075558'; // Remplacez par votre Steam ID
      const apiKey = '7AEBB6C629BC5A5CE294B96F09881111'; // Remplacez par votre clé API Steam
      let storedGames = localStorage.getItem('steamGames');
      
      // Vérifier si les données locales existent et sont valides
      if (storedGames) {
        storedGames = JSON.parse(storedGames);
        const currentTime = new Date().getTime();
        const storedTime = parseInt(storedGames.timestamp);
        
        // Si les données sont valides et ont été enregistrées il y a moins de 24 heures
        if (storedGames.data && storedTime && (currentTime - storedTime < 24 * 60 * 60 * 1000)) {
          this.games = storedGames.data;
          console.log('Données récupérées depuis localStorage');
        }
      }

      // Si les données locales ne sont pas valides ou inexistantes, récupérer depuis l'API Steam
      if (!this.games) {
        const response = await this.$axios.$get(`https://cors-anywhere.herokuapp.com/http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamID}&format=json&include_appinfo=1`);
        if (response && response.response && response.response.games) {
          this.games = response.response.games;
          // Enregistrer les données dans localStorage
          localStorage.setItem('steamGames', JSON.stringify({
            timestamp: new Date().getTime(),
            data: this.games
          }));
          console.log('Données récupérées depuis l\'API Steam');
        } else {
          console.error('Réponse invalide de l\'API Steam:', response);
        }
      }

    } catch (error) {
      console.error('Erreur lors de la récupération des jeux Steam:', error);
    }
  },
  methods: {
    getGameIconUrl(appid, iconHash) {
      return `http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${iconHash}.jpg`;
    },
    formatHours(minutes) {
      return Math.round(minutes / 60) + 'h';
    },
    // Méthode de tri par nom de jeu
    sortByGameName() {
      this.sortBy = 'name';
      this.sortDesc = !this.sortDesc; // Inverser l'ordre à chaque clic
      this.sortGames();
    },
    // Méthode de tri par nombre d'heures jouées
    sortByPlaytime() {
      this.sortBy = 'playtime_forever';
      this.sortDesc = !this.sortDesc; // Inverser l'ordre à chaque clic
      this.sortGames();
    },
    // Fonction générale pour trier les jeux
    sortGames() {
      if (this.games) {
        this.games.sort((a, b) => {
          const fieldA = a[this.sortBy];
          const fieldB = b[this.sortBy];
          if (this.sortDesc) {
            return fieldB - fieldA;
          } else {
            return fieldA - fieldB;
          }
        });
      }
    }
  }
}
</script>

<style scoped>
.game-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.game-icon {
  width: 50px; /* Ajustez la taille de l'icône selon vos besoins */
  height: 50px; /* Ajustez la taille de l'icône selon vos besoins */
  margin-right: 10px;
}
</style>
