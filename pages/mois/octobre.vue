<template>
  <div class="wrapperSite">
    <Entete />
    <Entetesecondaire />
    <StyleSheet />
    <ArticleElem
      titreElem="Octobre 2023"
      contenuElem="Dépenses & revenu de tous les jeux du mois"
    />
    <div class="grid justify-center p-10">
      <table>
      <thead>
          <tr class="font-black">
            <th>Total Payé</th>
            <th>Total Prix le plus bas (Marché Noir)</th>
            <th>Total Prix le plus bas</th>
            <th>Total Prix hors soldes</th>
          </tr>
        </thead>
      <tr class="total-prix">
        <td> {{  round(totalPrixPaye) }} €</td>
        <td> {{  round(totalPrixPlusBasMarcheNoir) }} €</td>
        <td> {{  round(totalprixPlusBas) }} €</td>
        <td> {{  round(totalPrixHorsSoldes) }} €</td>
      </tr>
    </table>

    <div class=" gap-20 flexDirectionScroll" data-scroll-container>
        <!-- Utilisation du composant GameGroup pour afficher les groupes de jeux -->
        <GameGroup
          v-for="(group, index) in gameGroups"
          :key="index"
          :group-name="group.groupName"
          :games="group.games"
          :prix-total-paye="group.prixTotalPaye"
          :lienBundle="group.lienBundle"
          :bundle="group.bundle"
          :statut="group.statut"
          :nombrejeuxbundle="group.nombrejeuxbundle"
          :nombrejeuxvoulus="group.nombrejeuxvoulus"
          :nombrejeuxachetables="group.nombrejeuxachetables"
        />
        
      </div>
    </div>
  </div>
</template>


<script>
import StyleSheet from '~/components/StyleSheet';
import ArticleElem from '~/components/article';
import Entete from '~/components/entete';
import EnteteSecondaire from '~/components/entetesecondaire';
import GameGroup from '~/components/GameGroup'; // Importez le composant GameGroup


export default {
  components: {
    StyleSheet,
    ArticleElem,
    Entete,
    EnteteSecondaire,
    GameGroup, // Ajoutez le composant GameGroup ici
  },
  data() {
    return {
      gameGroups: [
        {//group 1 : Awesome Indies from Humble Games
          groupName: "Awesome Indies from Humble Games",
          games: [
       
        {
          name: "The Wild At Heart",
          prixPlusBasMarcheNoir: 4.00,
          prixPlusBas: 18.39,
          prixHorsSoldes : 24.99,
          statut: 'keep'
        },
        {
          name: "Dodgeball Academia",
          prixPlusBasMarcheNoir: 5.30,
          prixPlusBas: 17.16,
          prixHorsSoldes : 24.99,
          statut: 'keep'
        },
        {
          name: "Void Bastard",
          prixPlusBasMarcheNoir: 3.14,
          prixPlusBas: 23.58,
          prixHorsSoldes : 29.99,
          statut: 'keep'
        },
        {
          name: "Ring of pain",
          prixPlusBasMarcheNoir: 1.41,
          prixPlusBas: 13.64,
          prixHorsSoldes : 19.99,
          statut: 'keep'
        },
        {
          name: "ikenfell",
          prixPlusBasMarcheNoir: 0.79,
          prixPlusBas: 13.64,
          prixHorsSoldes : 19.99,
          statut: 'keep'
        },
        {
          name: "Fae Tactics",
          prixPlusBasMarcheNoir: 2.01,
          prixPlusBas: 13.64,
          prixHorsSoldes : 19.99,
          statut: 'keep'
        },
        {
          name: "Unsighted => drake hollow",
          prixPlusBasMarcheNoir: 2.34,
          prixPlusBas: 24.99,
          prixHorsSoldes : 24.99,
          statut: 'traded'
        },
        {
          name: "Unsighted => Nadir",
          prixPlusBasMarcheNoir:2.09,
          prixPlusBas: 15.99,
          prixHorsSoldes : 19.99,
          statut: 'traded'
        },
        {
          name: "Moonscars => Dungeon / Dungeon!",
          prixPlusBasMarcheNoir: 13.98,
          prixPlusBas: 14.79,
          prixHorsSoldes : 14.79,
          statut: 'traded'
        },
        {
          name: "Flynn Son of crimson => Quest of dungeons",
          prixPlusBasMarcheNoir: 1.29,
          prixPlusBas: 4.99,
          prixHorsSoldes : 4.99,
          statut: 'traded'
        },
        {
          name: "Flynn Son of crimson => Where the water taste like wine",
          prixPlusBasMarcheNoir: 0.64,
          prixPlusBas: 14.69,
          prixHorsSoldes : 19.99,
          statut: 'traded'
        },
        {
          name: "Archvale => 100 steps",
          prixPlusBasMarcheNoir: 8.49,
          prixPlusBas: 8.49,
          prixHorsSoldes : 9.99,
          statut: 'traded'
        },
        // Ajoutez d'autres jeux avec leurs informations ici
      ],
      prixTotalPaye: 13.06, // Prix total payé pour tous les jeux
      lienBundle : 'https://www.humblebundle.com/games/awesome-indies-from-humble-games',
      bundle : true,
      nombrejeuxbundle : 10,
      nombrejeuxvoulus : 5,
      nombrejeuxachetables : 3,
      }, 
      {//group 2 : Platinum collection october 
          groupName: "Platinum collection october",
          games: [
        {
          name: "Tinykin",
          prixPlusBasMarcheNoir:4.59,
          prixPlusBas: 11.59,
          prixHorsSoldes : 24.50,
          statut: 'keep'
        },
        {
          name: "Trailmakers",
          prixPlusBasMarcheNoir: 3.91,
          prixPlusBas: 6.00,
          prixHorsSoldes : 24.99,
          statut: 'keep'
        },
        {
          name: "Wytchwood",
          prixPlusBasMarcheNoir: 2.83,
          prixPlusBas: 8.81,
          prixHorsSoldes : 16.79,
          statut: 'keep'
        },
        // Ajoutez d'autres jeux avec leurs informations ici
      ],
      prixTotalPaye: 9.99, // Prix total payé pour tous les jeux
      lienBundle : 'https://www.fanatical.com/en/pick-and-mix/platinum-collection-build-your-own-bundle',
      bundle : true,
      nombrejeuxbundle : 3,
      nombrejeuxvoulus : 3,
      nombrejeuxachetables : 1,
      },
      
      {//group 3 : For the king 2
        groupName: "For the king 2",
        games: [
        {
          name: "For the king 2",
          bundle : false,
          prixPlusBas: 19.23,
          prixPlusBasMarcheNoir: 19.39,
          prixHorsSoldes : 24.99
        },
        // Ajoutez d'autres jeux avec leurs informations ici
      ],
      prixTotalPaye: 22.49, // Prix total payé pour tous les jeux
      lienBundle : 'https://store.steampowered.com/app/1676840/For_The_King_II/',
      nombrejeuxbundle : 1,
      nombrejeuxvoulus : 1,
      nombrejeuxachetables : 1,
      },
      
      {//group 4 : Slime 3K
        groupName: "Slime 3K",
        games: [
        {
          name: "Slime 3K",
          bundle : false,
          prixPlusBas: 3.57,
          prixPlusBasMarcheNoir: 3.77,
          prixHorsSoldes : 4.99
        },
        // Ajoutez d'autres jeux avec leurs informations ici
      ],
      prixTotalPaye: 3.49, // Prix total payé pour tous les jeux
      lienBundle : 'https://store.steampowered.com/app/2348610/Slime_3K_Rise_Against_Despot/',
      nombrejeuxbundle : 1,
      nombrejeuxvoulus : 1,
      nombrejeuxachetables : 1,
      },
    ]
    };
  },
  computed: {
    totalPrixHorsSoldes() {
      // Utilisez reduce pour calculer la somme des prix hors soldes de tous les jeux
      return this.gameGroups.reduce((total, group) => {
        const groupTotal = group.games.reduce((groupSum, game) => {
          return groupSum + game.prixHorsSoldes;
        }, 0);
        return total + groupTotal;
      }, 0);
    },
    totalprixPlusBas() {
      // Utilisez reduce pour calculer la somme des prix hors soldes de tous les jeux
      return this.gameGroups.reduce((total, group) => {
        const groupTotal = group.games.reduce((groupSum, game) => {
          return groupSum + game.prixPlusBas;
        }, 0);
        return total + groupTotal;
      }, 0);
    },
    totalPrixPaye() {
      // Utilisez reduce pour calculer la somme des prix payés de tous les jeux de tous les groupes
      return this.gameGroups.reduce((total, group) => {
        return total + group.prixTotalPaye;
      }, 0);
    },
    totalPrixPlusBasMarcheNoir() {
      // Utilisez reduce pour calculer la somme des prix hors soldes de tous les jeux
      return this.gameGroups.reduce((total, group) => {
        const groupTotal = group.games.reduce((groupSum, game) => {
          return groupSum + game.prixPlusBasMarcheNoir;
        }, 0);
        return total + groupTotal;
      }, 0);
    },
  },
  methods: {
      round(value) {
        // Utilisation de Math.round() pour arrondir le prix payé par jeu
        return parseFloat(value).toFixed(2);
      },
    },
};
</script>