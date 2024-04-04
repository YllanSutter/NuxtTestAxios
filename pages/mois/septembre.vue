<template>
  <div class="wrapperSite">
    <Entete />
    <Entetesecondaire />
    <StyleSheet />
    <ArticleElem
      titreElem="Septembre 2023"
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
        {//group 1 : Humble Choice september 2023
          groupName: "Humble Choice - September 2023",
          games: [
            
        {
          name: "PATCH QUEST",
          prixPlusBas: 5.97,
          prixPlusBasMarcheNoir: 3.34,
          prixHorsSoldes : 14.99,
          statut: 'trade'
        },
        {
          name: "AUTONAUTS VS PIRATEBOTS",
          prixPlusBas: 5.39,
          prixPlusBasMarcheNoir: 2.14,
          prixHorsSoldes : 19.99,
          statut: 'trade'
        },
        {
          name: "TINY TINA'S WONDERLANDS CHAOTIC GREAT EDITION",
          prixPlusBas: 20,
          prixPlusBasMarcheNoir: 20,
          prixHorsSoldes : 79.99,
          statut: 'keep'
        },
        {
          name: "DECEIVE INC.",
          prixPlusBas: 10.67,
          prixPlusBasMarcheNoir: 8.49,
          prixHorsSoldes : 20,
          statut: 'keep'
        },
        {
          name: "THE FORGOTTEN CITY",
          prixPlusBas: 10.61,
          prixPlusBasMarcheNoir: 8.74,
          prixHorsSoldes : 24.99,
          statut: 'keep'
        },
        {
          name: "ACES & ADVENTURES",
          prixPlusBas: 10.05,
          prixPlusBasMarcheNoir: 6.52,
          prixHorsSoldes : 19.50,
          statut: 'keep'
        },
        {
          name: "FORETALES",
          prixPlusBas: 12.31,
          prixPlusBasMarcheNoir: 10.29,
          prixHorsSoldes : 19.99,
          statut: 'keep'
        },
        {
          name: "WHO PRESSED MUTE ON UNCLE MARCUS",
          prixPlusBas: 6.20,
          prixPlusBasMarcheNoir: 4.43,
          prixHorsSoldes : 14.79,
          statut: 'keep'
        },
        // Ajoutez d'autres jeux avec leurs informations ici
      ],
      prixTotalPaye: 9.99, // Prix total payé pour tous les jeux
      lienBundle : 'https://www.humblebundle.com/membership/september-2023',
      bundle : true,
      nombrejeuxbundle : 5,
      nombrejeuxvoulus : 5,
      nombrejeuxachetables : 5,
      },
      {//group 2 : Wandering Sword
        groupName: "Wandering Sword",
        games: [
        {
          name: "WANDERING SWORD",
          bundle : false,
          prixPlusBas: 21.54,
          prixPlusBasMarcheNoir: 21.54,
          prixHorsSoldes : 24.50
        },
        // Ajoutez d'autres jeux avec leurs informations ici
      ],
      prixTotalPaye: 21.54, // Prix total payé pour tous les jeux
      lienBundle : 'https://store.steampowered.com/app/1876890/Wandering_Sword/',
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