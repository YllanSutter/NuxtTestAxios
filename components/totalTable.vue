<template>
  <table v-if="!columnVisibility.UncheckAll" class="justify-center max-w-screen-2xl mx-auto p-5 text-white selectableTable">
    <thead>
      <tr>
        <th>Totaux</th>
        <th v-if="columnVisibility.showPrixPaye">Prix payé</th>
        <th v-if="columnVisibility.nombreJeux">Nombre de jeux</th>
        <th v-if="columnVisibility.showHeuresJouees">Heures jouées</th>
        <th v-if="columnVisibility.showPrixBasMarche">Marché noir</th>
        <th v-if="columnVisibility.showPrixBas">Soldes</th>
        <th v-if="columnVisibility.showPrixHorsSoldes">Hors soldes</th>
      </tr>
    </thead>
    <tbody>
      <tr class="total bg-gray-900 w-full">
        <td>Total général</td>
        <td v-if="columnVisibility.showPrixPaye" class="currency" :class="getPriceClass(calculations.calculateGrandTotalPrixPaye())">{{ calculations.calculateGrandTotalPrixPaye() }}</td>
        <td v-if="columnVisibility.nombreJeux" class="nbjeux">{{ calculations.totalNumberOfGamesForVisibleTables() }}</td>
        <td v-if="columnVisibility.showHeuresJouees" class="heures">{{ calculations.calculateGrandTotal('heuresJouees') }}</td>
        <td v-if="columnVisibility.showPrixBasMarche" class="currency">{{ calculations.calculateGrandTotal('prixbasmarche') }}</td>
        <td v-if="columnVisibility.showPrixBas" class="currency">{{ calculations.calculateGrandTotal('prixbas') }}</td>
        <td v-if="columnVisibility.showPrixHorsSoldes" class="currency">{{ calculations.calculateGrandTotal('prixHorsSoldes') }}</td>
      </tr>
    </tbody>
    <tfoot v-if="columnVisibility.Ratio">
      <tr>
        <td>Ratio</td>
        <td v-if="columnVisibility.showPrixPaye"></td>
        <td v-if="columnVisibility.nombreJeux" class="ratio" :class="getRatioClass(calculations.ratio(calculations.calculateGrandTotalPrixPaye(), calculations.totalNumberOfGamesForVisibleTables()))">{{ calculations.ratio(calculations.calculateGrandTotalPrixPaye(), calculations.totalNumberOfGamesForVisibleTables()) }}€/jeu</td>
        <td v-if="columnVisibility.showHeuresJouees" class="ratio" :class="getRatioClass(calculations.ratio(calculations.calculateGrandTotalPrixPaye(), calculations.calculateGrandTotal('heuresJouees')))">{{ calculations.ratio(calculations.calculateGrandTotalPrixPaye(), calculations.calculateGrandTotal('heuresJouees')) }}€/h</td>
        <td v-if="columnVisibility.showPrixBasMarche" class="ratio" :class="getRatioClass(calculations.ratio(calculations.calculateGrandTotal('prixbasmarche'), calculations.calculateGrandTotalPrixPaye()))">Cout * {{ calculations.ratio(calculations.calculateGrandTotal('prixbasmarche'), calculations.calculateGrandTotalPrixPaye()) }}</td>
        <td v-if="columnVisibility.showPrixBas" class="ratio" :class="getRatioClass(calculations.ratio(calculations.calculateGrandTotal('prixbas'), calculations.calculateGrandTotalPrixPaye()))">Cout * {{ calculations.ratio(calculations.calculateGrandTotal('prixbas'), calculations.calculateGrandTotalPrixPaye()) }}</td>
        <td v-if="columnVisibility.showPrixHorsSoldes" class="ratio" :class="getRatioClass(calculations.ratio(calculations.calculateGrandTotal('prixHorsSoldes'), calculations.calculateGrandTotalPrixPaye()))">Cout * {{ calculations.ratio(calculations.calculateGrandTotal('prixHorsSoldes'), calculations.calculateGrandTotalPrixPaye()) }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
export default {
  props: {
    columnVisibility: {
      type: Object,
      required: true
    },
    calculations: {
      type: Object,
      required: true
    }
  },
  methods: {
    getPriceClass(value) {
      if (value > 0 && value <= 25) return 'green';
      if (value > 25 && value < 50) return 'orange';
      if (value >= 50) return 'red';
      return '';
    },
    getRatioClass(value) {
      if (value > 0 && value <= 2.5) return 'green';
      if (value > 2.5 && value < 4) return 'orange';
      if (value >= 4) return 'red';
      return '';
    }
  }
}
</script>