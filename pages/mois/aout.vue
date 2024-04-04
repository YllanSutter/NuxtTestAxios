<template>
  <div class="wrapperSite">
    <Entete />
    <Entetesecondaire />
    <StyleSheet />
    <ArticleElem
      titreElem="Août 2023"
      contenuElem="Dépenses & revenu de tous les jeux du mois"
    />
    <div class="grid justify-center p-10">

      <!-- Afficher le total des prix hors soldes -->
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
import GameGroup from '~/components/GameGroup'; // Importez le composant GameGroup


export default {
  components: {
    StyleSheet,
    ArticleElem,
    Entete,
    GameGroup, // Ajoutez le composant GameGroup ici
  },
  data() {
    return {
      gameGroups: [
        {//groupe 1
          groupName: "Take your turn",
          games: [
         {
          name: "Song of conquest",
          prixPlusBas: 14.99,
          prixPlusBasMarcheNoir: 10.74,
          prixHorsSoldes :  29.99,
          statut: 'keep'
        },
        {
          name: "Banner saga trilogy deluxe pack",
          prixPlusBas: 11.80,
          prixPlusBasMarcheNoir: 6.44,
          prixHorsSoldes :  64.15,
          statut: 'keep'
        },
        {
          name: "Panzer Corps 2 => Immortal realms : vampire wars",
          prixPlusBas: 13.79,
          prixPlusBasMarcheNoir: 2.89,
          prixHorsSoldes :  29.99,
          statut: 'traded'
        },
        {
          name: "Panzer corps 2 => Spellcaster university",
          prixPlusBas: 16.79,
          prixPlusBasMarcheNoir: 2.10,
          prixHorsSoldes : 20.99,
          statut: 'traded'
        },
        {
          name: "Jupiter Hell => Before we leave",
          prixPlusBas: 3.43,
          prixPlusBasMarcheNoir: 1.59,
          prixHorsSoldes : 17.99,
          statut: 'traded'
        },
        {
          name: "Jupiter hell  => Unexplored 2",
          prixPlusBas:  15.42,
          prixPlusBasMarcheNoir: 1.07,
          prixHorsSoldes : 19.50,
          statut: 'traded'
        },
        {
          name: "Jupiter hell => Spirit Hunter NG",
          prixPlusBas: 17.21,
          prixPlusBasMarcheNoir: 2.72,
          prixHorsSoldes : 41.99,
          statut: 'traded'
        },
        {
          name: "Jack move => TOEM",
          prixPlusBas: 15.99,
          prixPlusBasMarcheNoir: 0.89,
          prixHorsSoldes : 19.50,
          statut: 'traded'
        },
        {
          name: "Jack Move => Supraland",
          prixPlusBas: 9.99,
          prixPlusBasMarcheNoir: 1.63,
          prixHorsSoldes : 19.99,
          statut: 'traded'
        },
        {
          name: "Coromon => Alien fireteam elite",
          prixPlusBas: 11.85,
          prixPlusBasMarcheNoir: 4.13 ,
          prixHorsSoldes : 29.99,
          statut: 'traded'
        },
        {
          name: "Coromon => Alien fireteam elite",
          prixPlusBas: 11.85,
          prixPlusBasMarcheNoir: 4.13 ,
          prixHorsSoldes : 29.99,
          statut: 'traded'
        },
        {
          name: "The Dungeon of Naheulbeuk => Tohu",
          prixPlusBas: 10.78,
          prixPlusBasMarcheNoir: 0.75,
          prixHorsSoldes : 12.99,
          statut: 'traded'
        },
        {
          name: "The Dungeon of Naheulbeuk => Tsioque",
          prixPlusBas: 11.59,
          prixPlusBasMarcheNoir: 1.08,
          prixHorsSoldes : 11.59,
          statut: 'traded'
        },
        // Ajoutez d'autres jeux avec leurs informations ici
      ],
        prixTotalPaye: 18.18, // Prix total payé pour tous les jeux
        lienBundle : 'https://www.humblebundle.com/games/take-your-turn-tactics-rpgs',
        nombrejeuxbundle : 8,
        nombrejeuxvoulus : 4,
        bundle:true,
        nombrejeuxachetables : 1,
      },
       {//groupe 2
        groupName: "Into game bundle",
          games: [
         {
          name: "Arcade Spirits",
          prixPlusBas: 14.08,
          prixPlusBasMarcheNoir: 0.58 ,
          prixHorsSoldes :  19.99,
          statut: 'trade'
        },
        {
          name: "Autonauts",
          prixPlusBas: 5.49,
          prixPlusBasMarcheNoir: 1.09,
          prixHorsSoldes :  19.99,
          statut: 'trade'
        },
        {
          name: "Tango Fiesta",
          prixPlusBas: 8.29,
          prixPlusBasMarcheNoir: 0.93,
          prixHorsSoldes :9.99,
          statut: 'trade'
        },
        {
          name: "Big Crown®: Showdown",
          prixPlusBas: 2.59,
          prixPlusBasMarcheNoir: 1.54,
          prixHorsSoldes : 16.97,
          statut: 'keep'
        },
        {
          name: "Attack of the Earthlings",
          prixPlusBas: 3.35,
          prixPlusBasMarcheNoir: 2.34 ,
          prixHorsSoldes :  12.59,
          statut: 'keep'
        },
        {
          name: "Sable",
          prixPlusBas: 9.99,
          prixPlusBasMarcheNoir: 1.31,
          prixHorsSoldes : 25,
          statut: 'keep'
        },
        {
          name: "Evil Genius 2: World Domination",
          prixPlusBas: 7.49,
          prixPlusBasMarcheNoir: 6.53,
          prixHorsSoldes : 40,
          statut: 'keep'
        },
        {
          name: "West of Dead",
          prixPlusBas: 1.69,
          prixPlusBasMarcheNoir: 1.00,
          prixHorsSoldes : 20,
          statut: 'keep'
        },
        {
          name: "Overcooked => Scarlet Tower",
          prixPlusBas:  2.39,
          prixPlusBasMarcheNoir: 1.17,
          prixHorsSoldes : 4.00,
          statut: 'traded'
        },
        {
          name: "The Assembly => Behind the frame",
          prixPlusBas: 2.94,
          prixPlusBasMarcheNoir: 0.86,
          prixHorsSoldes : 12.79,
          statut: 'traded'
        },
        {
          name: "Yooka-Laylee => Automachef",
          prixPlusBas:  2.01,
          prixPlusBasMarcheNoir:0.96 ,
          prixHorsSoldes : 14.99,
          statut: 'traded'
        },
        {
          name: "Little Orpheus => Call of the sea",
          prixPlusBas: 14.94,
          prixPlusBasMarcheNoir: 1,
          prixHorsSoldes : 19.99,
          statut: 'traded'
        },
        // Ajoutez d'autres jeux avec leurs informations ici
      ],
        prixTotalPaye: 7.99, // Prix total payé pour tous les jeux
        lienBundle : 'https://www.fanatical.com/en/orders/64dfb2fe834e7e93e45b340a',
        nombrejeuxbundle : 12,
        nombrejeuxvoulus : 3,
        bundle:true,
        nombrejeuxachetables : 1,
      },
      {//groupe 3
        groupName: "If you build it",
          games: [
         {
          name: "The tenants",
          prixPlusBasMarcheNoir: 6.84,
          prixPlusBas: 13.80,
          prixHorsSoldes :  18.68,
          statut: 'keep'
        },
        {
          name: "Airborne Kingdom",
          prixPlusBasMarcheNoir:3.23 ,
          prixPlusBas: 8.39,
          prixHorsSoldes : 24.50,
          statut: 'keep'
        },
        {
          name: "Pan'orama",
          prixPlusBasMarcheNoir: 4.76,
          prixPlusBas: 13.79,
          prixHorsSoldes :  13.79,
          statut: 'keep'
        },
        
        {
          name: "Evil Genius 2 => We happy few",
          prixPlusBasMarcheNoir: 3.52,
          prixPlusBas: 45.64,
          prixHorsSoldes :  59.99,
          statut: 'traded'
        },
        {
          name: "Frozenheim => House flipper",
          prixPlusBasMarcheNoir: 3.76,
          prixPlusBas: 2.45,
          prixHorsSoldes :  24.50,
          statut: 'traded'
        },
        {
          name: "Frozenheim => paradise killer",
          prixPlusBasMarcheNoir: 1.58,
          prixPlusBas: 8.81,
          prixHorsSoldes :  19.50,
          statut: 'traded'
        },
        // Ajoutez d'autres jeux avec leurs informations ici
      ],
        prixTotalPaye: 11.81, // Prix total payé pour tous les jeux
        lienBundle : 'https://www.humblebundle.com/downloads?key=uMEVXCCvYnGZ8SyT',
        nombrejeuxbundle : 5,
        nombrejeuxvoulus : 3,
        bundle:true,
        nombrejeuxachetables : 3,
      },
      {//groupe 4
        groupName: "Humble choice august 2023",
          games: [
         {
          name: "Disco Elysium",
          prixPlusBasMarcheNoir: 5.78,
          prixPlusBas: 39.99,
          prixHorsSoldes :  39.99,
          statut: 'keep'
        },
        {
          name: "Road 96",
          prixPlusBasMarcheNoir: 1.86,
          prixPlusBas: 6.98,
          prixHorsSoldes : 19.96,
          statut: 'keep'
        },
        {
          name: "Arcade Paradise",
          prixPlusBasMarcheNoir: 0.67,
          prixPlusBas: 14.89,
          prixHorsSoldes :  19.99,
          statut: 'keep'
        },
        
        {
          name: "Such art : genius artist",
          prixPlusBasMarcheNoir: 0.84,
          prixPlusBas: 13.74,
          prixHorsSoldes : 24.99,
          statut: 'keep'
        },
        {
          name: "Chivalry 2 => Farmer's dynasty",
          prixPlusBasMarcheNoir: 2.92,
          prixPlusBas: 29.99,
          prixHorsSoldes :  29.99,
          statut: 'traded'
        },
        {
          name: "Tin can => Theseus protocol",
          prixPlusBasMarcheNoir: 9.69,
          prixPlusBas: 8.09,
          prixHorsSoldes : 9.75,
          statut: 'traded'
        },
        {
          name: "Trek to yomi => Swag and sorcery",
          prixPlusBasMarcheNoir: 0.56,
          prixPlusBas: 8.44,
          prixHorsSoldes :  12.79,
          statut: 'traded'
        },
        {
          name: "Trek to yomi => Nowhere prophet",
          prixPlusBasMarcheNoir: 0.83,
          prixPlusBas: 19.99,
          prixHorsSoldes :  20.99,
          statut: 'traded'
        },
        // Ajoutez d'autres jeux avec leurs informations ici
      ],
        prixTotalPaye: 9.99, // Prix total payé pour tous les jeux
        lienBundle : 'https://www.humblebundle.com/downloads?key=uMEVXCCvYnGZ8SyT',
        nombrejeuxbundle : 8,
        nombrejeuxvoulus : 6,
        bundle:true,
        nombrejeuxachetables : 4,
      },
      {//group 5 : Wandering Sword
        groupName: "Vampire Survivors: Tides of the Foscari",
        games: [
        {
          name: "Vampire Survivors: Tides of the Foscari",
          bundle : false,
          prixPlusBasMarcheNoir: 2.37,
          prixPlusBas: 1.59,
          prixHorsSoldes : 1.99
        },
        // Ajoutez d'autres jeux avec leurs informations ici
      ],
      prixTotalPaye: 1.59, // Prix total payé pour tous les jeux
      lienBundle : 'https://store.steampowered.com/app/2313550/Vampire_Survivors_Tides_of_the_Foscari/',
      nombrejeuxbundle : 1,
      nombrejeuxvoulus : 1,
      nombrejeuxachetables : 1,
      },
      ],
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