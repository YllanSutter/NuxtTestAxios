<template>
  <div>
    <div>
      <!-- Filtre pour sélectionner les mois à afficher -->
      <div class="noborder p-5 justify-center max-w-screen-2xl mx-auto p-5 text-white text-center"> 
        <select v-model="selectedPlateforme" @change="updateTable">
          <option value="tous">toutes les plateformes</option>
          <option v-for="plateforme in plateformes" :key="plateforme" :value="plateforme">{{ plateforme }}</option>
        </select>
 
        <select v-model="selectedYear" @change="updateTable">
          <option value="tous">toutes les années</option>
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>

         <!-- Sélection des tags -->
      <select v-model="selectedTag" @change="updateTable">
        <option value="tous">Tous les tags</option>
        <option v-for="tag in TagsList" :key="tag" :value="tag">{{ tag }}</option>
      </select>
      </div>
  
    <!-- Filtre pour sélectionner ce qu'on affiche -->
      <div class="posfix checkboxTableauCalculator  text-white ">
      <div class="absBundle nopad affichageWrapChoix" @click="toggleWrapChoix">
        <p class="bg-green-500 p-5">Plus d'options</p>
      </div>
      <div class="wrapChoix bg-gray-900 grid p-10" v-show="isWrapChoixVisible">
        <!-- Checkbox -->
        <select v-model="selectedPlateforme" @change="filterTables">
          <option value="tous">toutes les plateformes</option>
          <option v-for="plateforme in plateformes" :key="plateforme" :value="plateforme">{{ plateforme }}</option>
        </select>
    
        <select v-model="selectedYear" @change="filterTables">
          <option value="tous">toutes les années</option>
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
    
        <div  v-for="column in columnsCreate" :key="column[0]">
          <div class="checkbox-wrapper">
            <input type="checkbox" :id="'cbx-' + column[0]" class="inp-cbx" v-model="columnVisibility[column[0]]" @click="toggleColumn(column[0])" style="display:none"/>
            <label :for="'cbx-' + column[0]" class="cbx">
              <span class="checkbox-custom"><svg width="12px" height="9px" viewBox="0 0 12 9"> <polyline points="1 5 4 8 11 1"></polyline></svg></span>
              <span class="label-text">{{ column[1] }}</span>
            </label>
          </div>
        </div>

      </div>
    </div>
  </div>
    
    <table v-if="columnVisibility.tableau" border="1"  class="noborder p-5 justify-center max-w-screen-2xl mx-auto p-5 text-white">
      <thead>
        <tr>
          <th>Totaux par mois</th>
          <th v-if="columnVisibility.showPrixPaye">Coût</th>
          <th v-if="columnVisibility.nombreJeux">Nombre</th>
          <th v-if="columnVisibility.showHeuresJouees">Heures jouées</th>
          <th v-if="columnVisibility.showPrixBasMarche">Marché noir</th>
          <th v-if="columnVisibility.showPrixBas">Soldes</th>
          <th v-if="columnVisibility.showPrixHorsSoldes">Hors soldes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(total, month) in monthlyTotals" :key="month">
          <td class="statut keep">{{ month }}</td>
          <td v-if="columnVisibility.showPrixPaye" class="currency">{{ total.totalCout.toFixed(2) }}</td>
          <td v-if="columnVisibility.nombreJeux" class="">{{ total.totalnombreJeux }}</td>
          <td v-if="columnVisibility.showHeuresJouees" class="heures">{{ total.totalHoursPlayed.toFixed(2) }}</td>
          <td v-if="columnVisibility.showPrixBasMarche" class="currency">{{ total.totalPrixMarcheNoir.toFixed(2) }}</td>
          <td v-if="columnVisibility.showPrixBas" class="currency">{{ total.totalPrixBas.toFixed(2) }}</td>
          <td v-if="columnVisibility.showPrixHorsSoldes" class="currency">{{ total.totalPrixHorsSoldes.toFixed(2) }}</td>
          
        </tr>
      </tbody>
      <tfoot class="total bg-gray-900 w-full">
        <tr>
          <td>Total des totaux</td>
          <td v-if="columnVisibility.showPrixPaye" class="currency">{{ getTotalOfTotals('totalCout').toFixed(2) }}</td>
          <td v-if="columnVisibility.nombreJeux">{{ getTotalOfTotals('totalnombreJeux') }}</td>
          <td v-if="columnVisibility.showHeuresJouees" class="heures">{{ getTotalOfTotals('totalHoursPlayed').toFixed(2) }}</td>
          <td v-if="columnVisibility.showPrixBasMarche" class="currency">{{ getTotalOfTotals('totalPrixMarcheNoir').toFixed(2) }}</td>
          <td v-if="columnVisibility.showPrixBas" class="currency">{{ getTotalOfTotals('totalPrixBas').toFixed(2) }}</td>
          <td v-if="columnVisibility.showPrixHorsSoldes" class="currency">{{ getTotalOfTotals('totalPrixHorsSoldes').toFixed(2) }}</td>
        </tr>
      </tfoot>
    </table>

    <!-- Barres pour représenter les prix par mois -->
    <div class="bar-chart noborder p-5 justify-center max-w-screen-2xl mx-auto p-5 text-white" v-if="columnVisibility.showPrixPaye">
      <div class="barlines"><div v-for="index in numberOfLines" :key="index" class="barline"></div></div>
      <h2 class="absBundle">Prix payé en €</h2>
      <div v-for="(total, month) in monthlyTotals" :key="month" class="bar">
        <div class="bar-inner text-center bg-red-800" :style="{ height: calculateBarHeight(total.totalCout, calculateMaxValue('totalCout')) }">{{ total.totalCout.toFixed(0)}}</div>
        <span class="">{{ month }}</span>
      </div>
    </div>
    <div class="bar-chart noborder p-5 justify-center max-w-screen-2xl mx-auto p-5 text-white" v-if="columnVisibility.nombreJeux">
      <div class="barlines"><div v-for="index in numberOfLines" :key="index" class="barline"></div></div>
      <h2 class="absBundle">Nombre de jeux</h2>
      <div v-for="(total, month) in monthlyTotals" :key="month" class="bar">
        <div class="bar-inner text-center bg-blue-500" :style="{ height: calculateBarHeight(total.totalnombreJeux,calculateMaxValue('totalnombreJeux')) }">{{ total.totalnombreJeux.toFixed(0)}}</div>
        <span class="">{{ month }}</span>
      </div>
    </div>
    <div class="bar-chart noborder p-5 justify-center max-w-screen-2xl mx-auto p-5 text-white" v-if="columnVisibility.showHeuresJouees">
      <div class="barlines"><div v-for="index in numberOfLines" :key="index" class="barline"></div></div>
      <h2 class="absBundle">Heures jouées</h2>
      <div v-for="(total, month) in monthlyTotals" :key="month" class="bar">
        <div class="bar-inner text-center bg-purple-600" :style="{ height: calculateBarHeight(total.totalHoursPlayed,calculateMaxValue('totalHoursPlayed')) }">{{ total.totalHoursPlayed.toFixed(0)}}</div>
        <span class="">{{ month }}</span>
      </div>
    </div>
    <div class="bar-chart noborder p-5 justify-center max-w-screen-2xl mx-auto p-5 text-white" v-if="columnVisibility.showPrixBasMarche">
      <div class="barlines"><div v-for="index in numberOfLines" :key="index" class="barline"></div></div>
      <h2 class="absBundle">Marché noir</h2>
      <div v-for="(total, month) in monthlyTotals" :key="month" class="bar">
        <div class="bar-inner text-center bg-red-500" :style="{ height: calculateBarHeight(total.totalPrixMarcheNoir,calculateMaxValue('totalPrixMarcheNoir')) }">{{ total.totalPrixMarcheNoir.toFixed(0)}}</div>
        <span class="">{{ month }}</span>
      </div>
    </div>
    <div class="bar-chart noborder p-5 justify-center max-w-screen-2xl mx-auto p-5 text-white" v-if="columnVisibility.showPrixBas">
      <div class="barlines"><div v-for="index in numberOfLines" :key="index" class="barline"></div></div>
      <h2 class="absBundle">Soldes</h2>
      <div v-for="(total, month) in monthlyTotals" :key="month" class="bar">
        <div class="bar-inner text-center bg-yellow-600" :style="{ height: calculateBarHeight(total.totalPrixBas,calculateMaxValue('totalPrixBas')) }">{{ total.totalPrixBas.toFixed(0)}}</div>
        <span class="">{{ month }}</span>
      </div>
    </div>
    <div class="bar-chart noborder p-5 justify-center max-w-screen-2xl mx-auto p-5 text-white" v-if="columnVisibility.showPrixHorsSoldes">
      <div class="barlines"><div v-for="index in numberOfLines" :key="index" class="barline"></div></div>
      <h2 class="absBundle">Hors Soldes</h2>
      <div v-for="(total, month) in monthlyTotals" :key="month" class="bar">
        <div class="bar-inner text-center bg-green-900" :style="{ height: calculateBarHeight(total.totalPrixHorsSoldes,calculateMaxValue('totalPrixHorsSoldes')) }">{{ total.totalPrixHorsSoldes.toFixed(0)}}</div>
        <span class="">{{ month }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { saveData, loadData } from '~/data/dataHandler';
import statsMixin from '~/plugins/statsMixin.js';
import filtersMixin from '~/plugins/filtersMixin.js';

export default {
  mixins: [statsMixin,filtersMixin],
  data() {
    return {
        monthlyTotals: {}, // Initialisation de monthlyTotals
        tables: [],
        lastTableId: 0,
        searchText:"",
        lastModified:'',
        currentMonth: '',
        selectedYear: 'tous',
        selectedMonth: 'tous', // Ajoutez cette propriété pour le filtre par mois
        selectedPlateforme: 'tous', // Ajoutez cette propriété pour le filtre par mois
        plateformes: [ // Ajoutez cette propriété
          "Autres", "Steam", "Fanatical", "Humble"
        ],
        years: [
          2023,2024,2025
        ],
        hideElementsVisible: true,
        columnVisibility: {
          tableau:false,
          showPrixPaye: true,
          showPrixBasMarche: true,
          showPrixBas:true,
          showPrixHorsSoldes:true,
          showHeuresJouees:true,
          nombreJeux:true,
        },
        columnsCreate : [
          ['tableau', 'Tableau'],
          ['showPrixPaye', 'Prix payé'],
          ['showPrixBasMarche', 'Prix marché noir'],
          ['showPrixBas', 'Prix en soldes'],
          ['showPrixHorsSoldes', 'Prix hors soldes'],
          ['showHeuresJouees', 'Heures jouées'],
          ['nombreJeux', 'Nombre de jeux'],
        ],
        columnCreateVisibility: this.generateColumnVisibilityObject(['showPrixPaye', 'showPrixBasMarche', 'showPrixBas', 'showPrixHorsSoldes', 'showHeuresJouees', 'showTag']),
        isWrapChoixVisible: false,
        showElementsVisibleAll: true,
        showTableInOne : false,
        TagsList: ["base", "trade", "traded", "platine", "keep"],
        selectedTag: 'tous', // Initialiser avec la première valeur par défaut
        numberOfLines: 5,
      };
  },
  mounted() {
    this.tables = loadData();
      if (!this.tables || !Array.isArray(this.tables)) {
        this.tables = [];
      }
      //On remet toutes les tables en visible
      this.tables.forEach((table) => {
        table.hideElementsVisible = true;
;      });
      
      const currentDate = new Date();

      // Obtenir l'année actuelle et l'initialiser
      const currentYear = currentDate.getFullYear();
      this.years = [currentYear - 1, currentYear, currentYear + 1]; // Vous pouvez personnaliser cette liste
      this.selectedYear = currentYear; // Initialiser selectedYear avec "toutes" pour afficher toutes les années

      //Obtenir la plateforme actuelle
      const plateformes = ["Autres", "Steam", "Fanatical", "Humble"];
      this.selectedPlateforme = "tous";

      
    // Appeler la méthode pour calculer les totaux par mois
    this.calculateTotalsByMonth();
  },
};
</script>