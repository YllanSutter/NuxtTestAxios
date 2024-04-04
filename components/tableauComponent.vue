<template>
  <div>
    <!-- Filtre pour sélectionner les mois à afficher -->
    <div class="noborder p-5 justify-center max-w-screen-2xl mx-auto p-5 text-white text-center"> 
      <select v-model="selectedPlateforme" @change="filterTables">
        <option value="tous">toutes les plateformes</option>
        <option v-for="plateforme in plateformes" :key="plateforme" :value="plateforme">{{ plateforme }}</option>
      </select>

      <select v-model="selectedMonth" @change="filterTables">
        <option value="tous">tous les mois</option>
        <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
      </select>

      <select v-model="selectedYear" @change="filterTables">
        <option value="tous">toutes les années</option>
        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
      </select>

      <select v-model="selectedTag" @change="filterByTag">
        <option value="tous">Tous les tags</option>
        <option v-for="tag in TagsList" :key="tag" :value="tag">{{ tag }}</option>
      </select>
      
      <input class="inputGap" v-model="searchText" @input="filterTables" placeholder="Rechercher..." />
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

      <select v-model="selectedMonth" @change="filterTables">
        <option value="tous">tous les mois</option>
        <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
      </select>

      <select v-model="selectedYear" @change="filterTables">
        <option value="tous">toutes les années</option>
        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
      </select>
      
      <!-- Sélection des tags -->
      <select v-model="selectedTag" @change="filterByTag">
        <option value="tous">Tous les tags</option>
        <option v-for="tag in TagsList" :key="tag" :value="tag">{{ tag }}</option>
      </select>

      <input class="inputGap" v-model="searchText" @input="filterTables" placeholder="Rechercher..." />

      <div  v-for="column in columnsCreate" :key="column[0]">
        <div class="checkbox-wrapper">
          <input type="checkbox" :id="'cbx-' + column[0]" class="inp-cbx" v-model="columnVisibility[column[0]]" @click="toggleColumn(column[0])" style="display:none"/>
          <label :for="'cbx-' + column[0]" class="cbx">
            <span class="checkbox-custom"><svg width="12px" height="9px" viewBox="0 0 12 9"> <polyline points="1 5 4 8 11 1"></polyline></svg></span>
            <span class="label-text">{{ column[1] }}</span>
          </label>
        </div>
      </div>

      <div class="checkbox-wrapper"> <input type="checkbox" id="tab-cbx-2" class="inp-cbx" v-model="columnVisibility.showTableInOne" @click="toggleDisplayMode" style="display:none"/><label class="cbx" for="tab-cbx-2"><span class="checkbox-custom"><svg width="12px" height="9px" viewBox="0 0 12 9"><polyline points="1 5 4 8 11 1"></polyline></svg></span><span class="label-text">Un seul tableau</span></label></div>
      <div v-if="!showTableInOne" class="checkbox-wrapper"><input type="checkbox" id="tab-cbx-1" class="inp-cbx" v-model="columnVisibility.hideAllElements" @click="hideAllElements()" style="display:none"/><label class="cbx" for="tab-cbx-1"><span class="checkbox-custom"><svg width="12px" height="9px" viewBox="0 0 12 9"><polyline points="1 5 4 8 11 1"></polyline></svg></span><span class="label-text">Réduire les tableaux</span></label></div>
      
    </div>
  </div>

    <!-- Tableau pour afficher le total de tous les totaux -->
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
          <td v-if="columnVisibility.showPrixPaye" class="currency"  :class="(calculateGrandTotalPrixPaye() > 0 && calculateGrandTotalPrixPaye() <= 25 ? 'green ' : '') + (calculateGrandTotalPrixPaye() > 25 && calculateGrandTotalPrixPaye() < 50 ? 'orange' : '') + (calculateGrandTotalPrixPaye() >= 50 ? 'red' : '')">{{ calculateGrandTotalPrixPaye() }}</td>
          <td v-if="columnVisibility.nombreJeux" class="nbjeux">{{ totalNumberOfGamesForVisibleTables() }}</td>
          <td v-if="columnVisibility.showHeuresJouees" class="heures">{{ calculateGrandTotal('heuresJouees') }}</td>
          <td v-if="columnVisibility.showPrixBasMarche" class="currency">{{ calculateGrandTotal('prixbasmarche') }}</td>
          <td v-if="columnVisibility.showPrixBas" class="currency">{{ calculateGrandTotal('prixbas') }}</td>
          <td v-if="columnVisibility.showPrixHorsSoldes" class="currency">{{ calculateGrandTotal('prixHorsSoldes') }}</td>
        </tr>
      </tbody>
      <tfoot v-if="columnVisibility.Ratio">
        <tr>
          <td>Ratio</td>
          <td v-if="columnVisibility.showPrixPaye"></td>
          <td v-if="columnVisibility.nombreJeux" class="ratio" :class="(ratio(calculateGrandTotalPrixPaye(),totalNumberOfGamesForVisibleTables()) > 0 && ratio(calculateGrandTotalPrixPaye(),totalNumberOfGamesForVisibleTables()) <= 2.5 ? 'green ' : '') + (ratio(calculateGrandTotalPrixPaye(),totalNumberOfGamesForVisibleTables()) > 2.5 && ratio(calculateGrandTotalPrixPaye(),totalNumberOfGamesForVisibleTables()) < 4 ? 'orange' : '') + (ratio(calculateGrandTotalPrixPaye(),totalNumberOfGamesForVisibleTables()) >= 4 ? 'red' : '')">{{ ratio(calculateGrandTotalPrixPaye(),totalNumberOfGamesForVisibleTables()) }}€/jeu</td>
          <td v-if="columnVisibility.showHeuresJouees" class="ratio" :class="(ratio(calculateGrandTotalPrixPaye(),calculateGrandTotal('heuresJouees')) > 0 && ratio(calculateGrandTotalPrixPaye(),calculateGrandTotal('heuresJouees')) <= 1 ? 'green ' : '') + (ratio(calculateGrandTotalPrixPaye(),calculateGrandTotal('heuresJouees')) > 1 && ratio(calculateGrandTotalPrixPaye(),calculateGrandTotal('heuresJouees')) < 2 ? 'orange' : '') + (ratio(calculateGrandTotalPrixPaye(),calculateGrandTotal('heuresJouees')) >= 2 ? 'red' : '')">{{ ratio(calculateGrandTotalPrixPaye(),calculateGrandTotal('heuresJouees')) }}€/h</td>
          <td v-if="columnVisibility.showPrixBasMarche" class="ratio" :class="(ratio(calculateGrandTotal('prixbasmarche'),calculateGrandTotalPrixPaye()) > 0 && ratio(calculateGrandTotal('prixbasmarche'),calculateGrandTotalPrixPaye()) <= 2 ? 'red ' : '') + (ratio(calculateGrandTotal('prixbasmarche'),calculateGrandTotalPrixPaye()) > 2 && ratio(calculateGrandTotal('prixbasmarche'),calculateGrandTotalPrixPaye()) < 5 ? 'orange' : '') + (ratio(calculateGrandTotal('prixbasmarche'),calculateGrandTotalPrixPaye()) >= 5 ? 'green' : '')">Cout * {{ ratio(calculateGrandTotal('prixbasmarche'),calculateGrandTotalPrixPaye()) }}</td>
          <td v-if="columnVisibility.showPrixBas" class="ratio" :class="(ratio(calculateGrandTotal('prixbas'),calculateGrandTotalPrixPaye()) > 0 && ratio(calculateGrandTotal('prixbas'),calculateGrandTotalPrixPaye()) <= 2 ? 'red ' : '') + (ratio(calculateGrandTotal('prixbas'),calculateGrandTotalPrixPaye()) > 2 && ratio(calculateGrandTotal('prixbas'),calculateGrandTotalPrixPaye()) < 5 ? 'orange' : '') + (ratio(calculateGrandTotal('prixbas'),calculateGrandTotalPrixPaye()) >= 5 ? 'green' : '')">Cout * {{ ratio(calculateGrandTotal('prixbas'),calculateGrandTotalPrixPaye()) }}</td>
          <td v-if="columnVisibility.showPrixHorsSoldes" class="ratio" :class="(ratio(calculateGrandTotal('prixHorsSoldes'),calculateGrandTotalPrixPaye()) > 0 && ratio(calculateGrandTotal('prixHorsSoldes'),calculateGrandTotalPrixPaye()) <= 2 ? 'red ' : '') + (ratio(calculateGrandTotal('prixHorsSoldes'),calculateGrandTotalPrixPaye()) > 2 && ratio(calculateGrandTotal('prixHorsSoldes'),calculateGrandTotalPrixPaye()) < 5 ? 'orange' : '') + (ratio(calculateGrandTotal('prixHorsSoldes'),calculateGrandTotalPrixPaye()) >= 5 ? 'green' : '')">Cout * {{ ratio(calculateGrandTotal('prixHorsSoldes'),calculateGrandTotalPrixPaye()) }}</td>
        </tr>
      </tfoot>
    </table>
    <div v-if="showTableInOne">
      <!-- Affichage de tous les tableaux en un seul -->
      <table class="justify-center max-w-screen-2xl mx-auto p-5 text-white triableTable">
        <thead>
          <!-- Entêtes communes à tous les tableaux (à modifier selon vos besoins) -->
          <tr>
            <th class="text-left">Nom</th>
            <th v-if="columnVisibility.showPrixPaye">Prix payé</th>
            <th v-if="columnVisibility.showPrixBasMarche">Marché noir</th>
            <th v-if="columnVisibility.showPrixBas">Soldes</th>
            <th v-if="columnVisibility.showPrixHorsSoldes">Hors soldes</th>
            <th v-if="columnVisibility.showHeuresJouees">Heures jouées</th>              
            <th v-if="columnVisibility.showTag" class="text-center">Tag</th>
          </tr>
        </thead>
        <tbody>
          <!-- Boucle pour afficher les données de tous les tableaux -->
          <tr v-for="(table, tableIndex) in filteredTables" :key="tableIndex">
            <!-- Insérer ici les données spécifiques de chaque tableau -->
            <template v-for="(item, rowIndex) in table.filteredItems" class="w-full">
              <tr  class="w-full">
                <!-- Insérer ici les données spécifiques de chaque item -->
                <td spellcheck="false" class="statut nopad baseWidth" :class="item.tag" :style="{ width: item.name.length * 9 + 'px'}"><input class="w-full" v-model="item.name" @input="saveDataLocally(table.id)" placeholder="Nom du jeu" :class="{ 'highlight': shouldHighlight(item.name, false) }" /></td>
                <td v-if="columnVisibility.showPrixPaye" class="currency">{{ calculatePrixPaye(table.cout, table.items.length) }}</td>
                <td v-if="columnVisibility.showPrixBasMarche" class="nopad currency"><input class="w-full" v-model="item.prixbasmarche" @input="fixDecimalSeparator(table.id, rowIndex, 'prixbasmarche')" placeholder="......" /></td>
                <td v-if="columnVisibility.showPrixBas" class="nopad currency"><input class="w-full" v-model="item.prixbas" @input="fixDecimalSeparator(table.id, rowIndex, 'prixbas')" placeholder="......"/></td>
                <td v-if="columnVisibility.showPrixHorsSoldes" class="nopad currency"><input class="w-full" v-model="item.prixHorsSoldes"  @input="fixDecimalSeparator(table.id, rowIndex, 'prixHorsSoldes')" placeholder="......"/></td>
                <td v-if="columnVisibility.showHeuresJouees" class="nopad heures"><input class="w-full" v-model="item.heuresJouees"  @input="fixDecimalSeparator(table.id, rowIndex, 'heuresJouees')" placeholder="......"/></td>
                <td v-if="columnVisibility.showTag" class="text-center">
                  <select v-model="item.tag" @change="saveDataLocally">
                    <option value="base">Base</option>
                    <option value="trade">Trade</option>
                    <option value="traded">Traded</option>
                    <option value="platine">100%</option>
                    <option value="keep">Keep</option>
                  </select>
                </td>
              </tr>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <div class="noborder p-5 justify-center max-w-screen-2xl mx-auto p-5 text-white" v-for="(table, tableIndex) in filteredTables" :key="tableIndex" :id="table.id">
        <div class="w-full p-10 text-center">
          <textarea spellcheck="false" class="textCenter nomTableau" v-model="table.tableText" @input="saveTableTextLocally(tableIndex)"></textarea>
          <textarea spellcheck="false" class="textCenter smallTextArea" v-model="table.tableText2" @input="saveTableTextLocally(tableIndex)"></textarea>
        </div>

        <table class="justify-center max-w-screen-2xl mx-auto p-5 text-white selectableTable" :class="[table.mois, { 'hideElements': !table.hideElementsVisible }]">
          <thead>
            <tr>
              <th class="text-center">Move</th>
              <th class="text-left">Nom</th>
              <th v-if="columnVisibility.showPrixPaye">Prix payé</th>
              <th v-if="columnVisibility.showPrixBasMarche">Marché noir</th>
              <th v-if="columnVisibility.showPrixBas">Soldes</th>
              <th v-if="columnVisibility.showPrixHorsSoldes">Hors soldes</th>
              <th v-if="columnVisibility.showHeuresJouees">Heures jouées</th>
              <th v-if="columnVisibility.showTag" class="text-center">Tag</th>
              <th v-if="columnVisibility.showActions && table.items.length > 1" class="hideChild"  @click="toggleHideElements(table.id)">{{ !table.hideElementsVisible ? 'Voir +' : 'Voir -' }}</th>
            </tr>
          </thead>
          <!-- <tbody v-if="table.items.length > 0"> -->
            <draggable v-if="table.items.length > 0" tag="tbody" v-model="table.items" v-bind="dragOptions" handle=".draghandle" @end="handleDragEnd">
              <tr v-for="(item, rowIndex) in table.filteredItems" :key="rowIndex" >
                <td class="draghandle"></td>
                <td spellcheck="false" class="statut nopad baseWidth" :class="item.tag" :style="{ width: item.name.length * 9 + 'px'}"><input class="w-full" v-model="item.name" @input="saveDataLocally(table.id)" placeholder="Nom du jeu" :class="{ 'highlight': shouldHighlight(item.name, false) }" /></td>
                <td v-if="columnVisibility.showPrixPaye" class="currency">{{ calculatePrixPaye(table.cout, table.items.length) }}</td>
                <td v-if="columnVisibility.showPrixBasMarche" class="nopad currency"><input class="w-full" v-model="item.prixbasmarche" @input="fixDecimalSeparator(table.id, rowIndex, 'prixbasmarche')" placeholder="......" /></td>
                <td v-if="columnVisibility.showPrixBas" class="nopad currency"><input class="w-full" v-model="item.prixbas" @input="fixDecimalSeparator(table.id, rowIndex, 'prixbas')" placeholder="......"/></td>
                <td v-if="columnVisibility.showPrixHorsSoldes" class="nopad currency"><input class="w-full" v-model="item.prixHorsSoldes"  @input="fixDecimalSeparator(table.id, rowIndex, 'prixHorsSoldes')" placeholder="......"/></td>
                <td v-if="columnVisibility.showHeuresJouees" class="nopad heures"><input class="w-full" v-model="item.heuresJouees"  @input="fixDecimalSeparator(table.id, rowIndex, 'heuresJouees')" placeholder="......"/></td>
                <td v-if="columnVisibility.showTag" class="text-center">
                  <select v-model="item.tag" @change="saveDataLocally">
                    <option value="base">Base</option>
                    <option value="trade">Trade</option>
                    <option value="traded">Traded</option>
                    <option value="platine">100%</option>
                    <option value="keep">Keep</option>
                  </select>
                </td>
                <!-- Supprimer une ligne (passer l'ID du tableau, ainsi que l'ID de la ligne) -->
                <td v-if="columnVisibility.showActions" @click="removeRow(table.id, rowIndex)" class="bg-red-500 text-center">Supprimer la ligne</td>
              </tr>
            <tr class="total bg-gray-900 w-full">
              <td></td>
              <td>Total : <span  v-if="columnVisibility.nombreJeux">Nombre de jeux : {{table.items.length}}</span></td>
              <td v-if="columnVisibility.showPrixPaye" class="nopad currency"><input class="w-full" v-model="table.cout" @input="saveDataLocally(table.id)" placeholder="Coût" /></td>
              <td v-if="columnVisibility.showPrixBasMarche" class="currency">{{ calculateTotal(table, 'prixbasmarche') }}</td>
              <td v-if="columnVisibility.showPrixBas" class="currency">{{ calculateTotal(table, 'prixbas') }}</td>
              <td v-if="columnVisibility.showPrixHorsSoldes" class="currency">{{ calculateTotal(table, 'prixHorsSoldes') }}</td>
              <td v-if="columnVisibility.showHeuresJouees" class="heures">{{ calculateTotal(table, 'heuresJouees') }}</td>
              <td v-if="columnVisibility.showTag" class="maxSize"></td>
              <td v-if="columnVisibility.showActions" class="maxSize lastmodified">Modifié le {{table.lastModified}}</td>
            </tr>
            <tr v-if="columnVisibility.Ratio">
                <td>Ratio</td>
                <td v-if="columnVisibility.showPrixPaye"></td>
                <td v-if="columnVisibility.nombreJeux" class="ratio" :class="(ratio(table.cout,table.items.length) > 0 && ratio(table.cout,table.items.length) <= 2.5 ? 'green ' : '') + (ratio(table.cout,table.items.length) > 2.5 && ratio(calculateGrandTotalPrixPaye(),totalNumberOfGamesForVisibleTables()) < 4 ? 'orange' : '') + (ratio(calculateGrandTotalPrixPaye(),totalNumberOfGamesForVisibleTables()) >= 4 ? 'red' : '')">{{ ratio(table.cout,table.items.length) }}€/jeu</td>
                <td v-if="columnVisibility.showPrixBasMarche" class="ratio" :class="(ratio(calculateTotal(table, 'prixbasmarche'),table.cout) > 0 && ratio(calculateTotal(table, 'prixbasmarche'),table.cout) <= 2 ? 'red ' : '') + (ratio(calculateTotal(table, 'prixbasmarche'),table.cout) > 2 && ratio(calculateTotal(table, 'prixbasmarche'),table.cout) < 5 ? 'orange' : '') + (ratio(calculateTotal(table, 'prixbasmarche'),table.cout) >= 5 ? 'green' : '')">Cout * {{ ratio(calculateTotal(table, 'prixbasmarche'),table.cout) }}</td>
                <td v-if="columnVisibility.showPrixBas" class="ratio" :class="(ratio(calculateTotal(table, 'prixbas'),table.cout) > 0 && ratio(calculateTotal(table, 'prixbas'),table.cout) <= 2 ? 'red ' : '') + (ratio(calculateTotal(table, 'prixbas'),table.cout) > 2 && ratio(calculateTotal(table, 'prixbas'),table.cout) < 5 ? 'orange' : '') + (ratio(calculateTotal(table, 'prixbas'),table.cout) >= 5 ? 'green' : '')">Cout * {{ ratio(calculateTotal(table, 'prixbas'),table.cout) }}</td>
                <td v-if="columnVisibility.showPrixHorsSoldes" class="ratio" :class="(ratio(calculateTotal(table, 'prixHorsSoldes'),table.cout) > 0 && ratio(calculateTotal(table, 'prixHorsSoldes'),table.cout) <= 2 ? 'red ' : '') + (ratio(calculateTotal(table, 'prixHorsSoldes'),table.cout) > 2 && ratio(calculateTotal(table, 'prixHorsSoldes'),table.cout) < 5 ? 'orange' : '') + (ratio(calculateTotal(table, 'prixHorsSoldes'),table.cout) >= 5 ? 'green' : '')">Cout * {{ ratio(calculateTotal(table, 'prixHorsSoldes'),table.cout) }}</td>
                <td v-if="columnVisibility.showHeuresJouees" class="ratio" :class="(ratio(table.cout,calculateTotal(table, 'heuresJouees')) > 0 && ratio(table.cout,calculateTotal(table, 'heuresJouees')) <= 1 ? 'green ' : '') + (ratio(table.cout,calculateTotal(table, 'heuresJouees')) > 1 && ratio(table.cout,calculateTotal(table, 'heuresJouees')) < 2 ? 'orange' : '') + (ratio(table.cout,calculateTotal(table, 'heuresJouees')) >= 2 ? 'red' : '')">{{ ratio(table.cout,calculateTotal(table, 'heuresJouees')) }}€/h</td>
            </tr>
            
          </draggable>
          <!-- </tbody> -->
          <tfoot>
            <td class="absBundle nopad">
              <p @click="addRow(table.id)" class="bg-green-500 p-5">Ajouter une ligne</p>
            </td>
            <td class="absBundle nopad inverse">
              <select v-model="table.plateforme" @change="saveDataLocally()">
                <option v-for="plateforme in plateformes" :key="plateforme" :value="plateforme">{{ plateforme }}</option>
              </select>
              <select v-model="table.mois" @change="saveDataLocally()">
                <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
              </select>
              <select v-model="table.annee" @change="saveDataLocally()">
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
              </select>
            </td>
          </tfoot>
        </table>
        <div class="grid remove justify-center max-w-screen-2xl mx-auto text-red-500 ">
          <p @click="confirmDeleteTable(table.id)" class="p-5 deleteTable">Supprimer le tableau</p>
        </div>
      </div>
    </div>
  
      <div class="space"></div>
      <button @click="addTable" class="text-white button justify-center p-10 text-center w-full">
        Ajouter un tableau
      </button>
    </div>
  </template>
  
  <script>

  import draggable from 'vuedraggable';
  import { saveData, loadData } from '~/data/dataHandler';
  import filtersMixin from '~/plugins/filtersMixin.js';

  
  export default {
  mixins: [filtersMixin],
    components: {
      draggable, // Ajoutez le composant vuedraggable
    },
    data() {
      return {
        dragOptions: {
          animation: 150, // Durée de l'animation de glissement en millisecondes
        },
        tables: [],
        tableText: '',
        tableText2: '',
        lastTableId: 0,
        lastModified:'',
        currentMonth: '',
        selectedYear: 'tous',
        selectedMonth: 'tous', // Ajoutez cette propriété pour le filtre par mois
        selectedPlateforme: 'tous', // Ajoutez cette propriété pour le filtre par mois
        months: [ // Ajoutez cette propriété
          "janvier", "février", "mars", "avril", "mai", "juin",
          "juillet", "aout", "septembre", "octobre", "novembre", "décembre"
        ],
        plateformes: [ // Ajoutez cette propriété
          "Autres", "Steam", "Fanatical", "Humble"
        ],
        years: [
          2023,2024,2025
        ],
        hideElementsVisible: true,
        searchText: '',
        columnVisibility: {
          showPrixPaye: true,
          showPrixBasMarche: true,
          showPrixBas:true,
          showPrixHorsSoldes:true,
          showHeuresJouees:true,
          nombreJeux:true,
          showTag:false,
          showActions:false,
          checkAll:false,
          UncheckAll:false,
          Ratio:false
        },
        columnsCreate : [
          ['checkAll', 'Check Tout'],
          ['UncheckAll', 'Uncheck Tout'],
          ['showPrixPaye', 'Prix payé'],
          ['showPrixBasMarche', 'Prix marché noir'],
          ['showPrixBas', 'Prix en soldes'],
          ['showPrixHorsSoldes', 'Prix hors soldes'],
          ['showHeuresJouees', 'Heures jouées'],
          ['nombreJeux', 'Nombre de jeux'],
          ['showActions', 'Actions'],
          ['showTag', 'Tags'],
          ['Ratio', 'Ratio'],
        ],
        columnCreateVisibility: this.generateColumnVisibilityObject(['showPrixPaye', 'showPrixBasMarche', 'showPrixBas', 'showPrixHorsSoldes', 'showHeuresJouees', 'showTag']),
        isWrapChoixVisible: false,
        showElementsVisibleAll: true,
        showTableInOne : false,
        TagsList: ["base", "trade", "traded", "platine", "keep"],
        selectedTag: 'tous', // Initialiser avec la première valeur par défaut
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
      });
      // Obtenir le mois actuel (par exemple, "janvier") et l'initialiser
      const months = ["janvier", "février", "mars", "avril", "mai", "juin","juillet", "aout", "septembre", "octobre", "novembre", "décembre"];
      
      const currentDate = new Date();
      this.currentMonth = months[currentDate.getMonth()];
      this.selectedMonth = this.currentMonth; // Initialiser selectedMonth avec le mois actuel
      //console.log(this.currentMonth)

      // Obtenir l'année actuelle et l'initialiser
      const currentYear = currentDate.getFullYear();
      this.years = [currentYear - 2,currentYear - 1, currentYear, currentYear + 1]; // Vous pouvez personnaliser cette liste
      this.selectedYear = currentYear; // Initialiser selectedYear avec "toutes" pour afficher toutes les années

      //Obtenir la plateforme actuelle
      const plateformes = ["Autres", "Steam", "Fanatical", "Humble"];
      this.selectedPlateforme = "tous";
    },
  };
  </script>