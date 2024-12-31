<template>
  <div>
    <Entete/>
    <StyleSheet/>
    
    <!-- Boutons de tri -->
    <div class="noborder p-5 justify-center max-w-screen-2xl mx-auto p-5 text-white flex gap-4" v-if="games"> 
      <button class="p-5 bg-gray-900" @click="sortByGameName">Trier par nom</button>
      <button class="p-5 bg-gray-900" @click="sortByPlaytime">Trier par heures jouées</button>
      <button class="p-5 bg-gray-900" @click="sortByPlaytime">Trier par last  play</button>
      <button class="p-5 bg-blue-500 text-white" @click="updateGames">Mettre à jour les jeux</button>
      <button class="p-5 bg-red-500 text-white" @click="clearLocalData">Effacer les données locales</button>
      <button class="p-5 bg-red-500 text-white" @click="changeVisibility('titre')">{{columnVisibility.titre ? 'Cacher le titre': 'Afficher le titre'}}</button>
      <button class="p-5 bg-red-500 text-white" @click="changeVisibility('heures')">{{columnVisibility.heures ? 'Cacher les heures': 'Afficher les heures'}}</button>
      <button @click="testProxy">Tester le Proxy</button>
      <!-- Ajoutez d'autres boutons pour d'autres critères de tri si nécessaire -->
    </div>
    <div class="grid grid-cols-2 p-20 items-start">
      <div class="wrapElem">
        <draggable v-model="games" class="noborder p-5 justify-center max-w-screen-2xl mx-auto p-5 text-white grid grid-cols-5 gap-10" v-bind="dragOptions" group="games" @end="handleDragEnd">
          <GameItem
            v-for="game in games"
            :key="game.appid"
            :game="game"
            :showTitle="columnVisibility.titre"
            :showHeures="columnVisibility.heures"
            @ggdeals-data-updated="handleGGDealsDataUpdate"
          />
        </draggable>
        <p v-if="!games.length">Chargement...</p>
      </div>
      <table class="tiers-container p-5">
        <div v-for="tier in tiers" :key="tier" class="tier white p-5 pl-10">
          <h3>{{ tier }}</h3>
          <draggable v-model="tierGames[tier]" class="noborder p-5 flex gap-2" v-bind="dragOptions" group="games" @end="handleDragEnd">
            <!-- <GameItem v-for="game in tierGames[tier]" :key="game.appid" :game="game"  :showTitle="columnVisibility.titre" :showHeures="columnVisibility.heures"/> -->
            <GameItem
              v-for="game in tierGames[tier]"
              :key="game.appid"
              :game="game"
              :showTitle="columnVisibility.titre"
              :showHeures="columnVisibility.heures"
              @ggdeals-data-updated="handleGGDealsDataUpdate"
            />
          </draggable>
        </div>
      </table>
      
    </div>
  </div>
</template>

<script>
import StyleSheet from '~/components/StyleSheet';
import Entete from '~/components/Entete';
import draggable from 'vuedraggable';
import GameItem from '~/components/gameItem.vue';

export default {
  data() {
    return {
      games: [],
      tiers: ['S', 'A', 'B', 'C', 'D'],
      tierGames: {
        S: [],
        A: [],
        B: [],
        C: [],
        D: []
      },
      sortBy: 'name', // Critère de tri par défaut
      sortDesc: false, // Ordre de tri par défaut (ascendant)
      dragOptions: {
        animation: 200,
        group: "description",
        disabled: false,
        chosenClass: "game-item",
        ghostClass: "ghost"
      },
      columnVisibility: {
        titre: false,
        heures: false,
      },
    }
  },
  components: {
      draggable, // Ajoutez le composant vuedraggable
  },
  mounted() {
    this.loadState();
  },
  watch: {
    tierGames: {
      handler(newValue) {
        console.log('tierGames modifié:', newValue);
        this.saveState();
      },
      deep: true
    }
  },

  methods: {
    getGameIconUrl(appid, iconHash) {
      return `http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${iconHash}.jpg`;
    },
    changeVisibility(elem){
      this.columnVisibility[elem] = !this.columnVisibility[elem];
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
    // Méthode de tri par nombre d'heures jouées
    sortByPlaytime() {
      this.sortBy = 'rtime_last_played';
      this.sortDesc = !this.sortDesc; // Inverser l'ordre à chaque clic
      this.sortGames();
    },
    // Fonction générale pour trier les jeux
    sortGames() {
      if (this.games) {
        this.games.sort((a, b) => {
          let fieldA = a[this.sortBy];
          let fieldB = b[this.sortBy];
          
          if (this.sortBy === 'name') {
            // Tri alphabétique pour les noms
            fieldA = fieldA.toLowerCase();
            fieldB = fieldB.toLowerCase();
            if (fieldA < fieldB) return this.sortDesc ? 1 : -1;
            if (fieldA > fieldB) return this.sortDesc ? -1 : 1;
            return 0;
          } else {
            // Tri numérique pour les autres champs (comme playtime_forever)
            return this.sortDesc ? fieldB - fieldA : fieldA - fieldB;
          }
        });
      }
    },
    loadState() {
      // Charger les jeux
      const storedGames = localStorage.getItem('games');
      if (storedGames) {
        this.games = JSON.parse(storedGames);
      }

      // Charger les tier lists
      const storedTierGames = localStorage.getItem('tierGames');
      if (storedTierGames) {
        this.tierGames = JSON.parse(storedTierGames);
      }

      console.log('État chargé depuis localStorage');
    },
    handleGGDealsDataUpdate(updatedGame) {
      const index = this.games.findIndex(game => game.appid === updatedGame.appid);
      if (index !== -1) {
        this.$set(this.games, index, updatedGame);
        this.saveState();
      }
    },
    handleDragEnd(event) {
      // Récupérer l'élément déplacé et sa nouvelle position
      const movedElement = event.item;
      const newParent = event.to;
      const oldParent = event.from;

      // Récupérer l'ID du jeu déplacé
      const gameId = movedElement.getAttribute('data-game-id');

      // Trouver le jeu dans la liste des jeux
      const game = this.games.find(g => g.appid.toString() === gameId);

      if (game) {
        // Si le jeu a été déplacé vers un tier
        if (newParent.classList.contains('tier')) {
          const tierName = newParent.getAttribute('data-tier');
          
          // Retirer le jeu de son ancien tier (s'il y était)
          Object.values(this.tierGames).forEach(tier => {
            const index = tier.findIndex(g => g.appid === game.appid);
            if (index !== -1) {
              tier.splice(index, 1);
            }
          });

          if (tierName && this.tierGames[tierName]) {
            this.tierGames[tierName].push(game);
          }

          // Retirer le jeu de la liste principale si nécessaire
          const gameIndex = this.games.findIndex(g => g.appid === game.appid);
          if (gameIndex !== -1) {
            this.games.splice(gameIndex, 1);
          }
        } 
        // Si le jeu a été déplacé vers la liste principale
        else if (newParent.classList.contains('main-list')) {
          // Retirer le jeu de son ancien tier
          Object.values(this.tierGames).forEach(tier => {
            const index = tier.findIndex(g => g.appid === game.appid);
            if (index !== -1) {
              tier.splice(index, 1);
            }
          });

          // Ajouter le jeu à la liste principale s'il n'y est pas déjà
          if (!this.games.some(g => g.appid === game.appid)) {
            this.games.push(game);
          }
        }

        // Sauvegarder l'état actuel dans le localStorage
        this.saveState();
      }

      // Réinitialiser les classes CSS si nécessaire
      movedElement.classList.remove('dragging');

      // Mettre à jour l'interface utilisateur si nécessaire
      this.$forceUpdate();
    },

    saveState() {
      const gamesWithGGDeals = this.games.map(game => ({
        ...game,
        ggDealsData: game.ggDealsData || null
      }));
      localStorage.setItem('games', JSON.stringify(gamesWithGGDeals));
      localStorage.setItem('tierGames', JSON.stringify(this.tierGames));
      console.log('État sauvegardé dans localStorage');
    },
    clearLocalData() {
      localStorage.removeItem('games');
      this.games = [];
      console.log('Données locales effacées');
    },
    async testProxy() {
    try {
      const steamID = '76561198121075558';
      const apiKey = '7AEBB6C629BC5A5CE294B96F09881111';
      const response = await this.$axios.$get(`/api/steam/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamID}&format=json&include_appinfo=1`);
      console.log('Réponse du proxy:', response);
    } catch (error) {
      console.error('Erreur lors de l\'appel au proxy:', error);
    }
  },
 async updateGames() {
  try {
    const steamID = '76561198121075558';
    const apiKey = '7AEBB6C629BC5A5CE294B96F09881111';

    // Récupération des jeux Steam
    const steamResponse = await this.$axios.$get(
      `/api/steam/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamID}&format=json&include_appinfo=1`
    );

    if (steamResponse?.response?.games) {
      let games = steamResponse.response.games;

      // Récupération des tags pour chaque jeu en parallèle avec un délai
      // for (let i = 0; i < games.length; i += 10) { // Traitez par lots de 10
      //   const chunk = games.slice(i, i + 10);
      //   await Promise.all(chunk.map(async (game) => {
      //     try {
      //       const tagResponse = await this.$axios.$get(
      //         `/api/store/appdetails?appids=${game.appid}` // Utilisez le proxy ici
      //       );

      //       if (tagResponse[game.appid]?.success) {
      //         const categories = tagResponse[game.appid].data.categories;
      //         game.tags = categories 
      //           ? categories.map(category => category.description).slice(0, 3).join(', ')
      //           : 'Aucun tag';
      //       } else {
      //         game.tags = 'Aucun tag';
      //       }

      //     } catch (tagError) {
      //       console.error(`Erreur lors de la récupération des tags pour ${game.name}:`, tagError);
      //       game.tags = '';
      //     }
      //   }));

      //   // Attendre un certain temps avant le prochain lot
      //   await new Promise(resolve => setTimeout(resolve, 2000)); // Attendre 2 secondes
      // }

      // Mettez à jour la liste des jeux et stockez-la dans localStorage
      this.games = games;
      localStorage.setItem('games', JSON.stringify(games));
      console.log('Jeux mis à jour et stockés dans localStorage');
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour des jeux:', error);
  }
}

  ,
  }
}
</script>
