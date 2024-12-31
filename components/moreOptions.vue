<template>
    <div  :class="[options.columnsCreate ? 'posfix checkboxTableauCalculator text-white' : 'test']">
      <div v-if="options.columnsCreate" class="absBundle nopad affichageWrapChoix" @click="toggleWrapChoix">
        <p class="bg-green-500 p-5">Plus d'options</p>
      </div>
      
      <div :class="[options.columnsCreate ? 'wrapChoix bg-gray-900 grid p-10' : 'noborder p-5 justify-center max-w-screen-2xl mx-auto p-5 text-white text-center forceshow']" v-show="isWrapChoixVisible || !options.columnsCreate">
        <select v-if="options.plateformes" v-model="localSelectedPlateforme" @change="handleSelection('Plateforme', localSelectedPlateforme)">
          <option value="tous">toutes les plateformes</option>
          <option v-for="plateforme in options.plateformes" :key="plateforme" :value="plateforme">{{ plateforme }}</option>
        </select>
        <select v-if="options.months" v-model="localSelectedMonth" @change="handleSelection('Month', localSelectedMonth)">
          <option value="tous">tous les mois</option>
          <option v-for="month in options.months" :key="month" :value="month">{{ month }}</option>
        </select>
        <select v-if="options.years" v-model="localSelectedYear" @change="handleSelection('Year', localSelectedYear)">
          <option value="tous">toutes les années</option>
          <option v-for="year in options.years" :key="year" :value="year">{{ year }}</option>
        </select>
        <select v-if="options.TagsList" v-model="localSelectedTag" @change="handleSelection('Tag', localSelectedTag)">
          <option value="tous">Tous les tags</option>
          <option v-for="tag in options.TagsList" :key="tag" :value="tag">{{ tag }}</option>
        </select>
        <input 
          v-if="options.searchText !== undefined"
          class="inputGap" 
          v-model="localSearchText" 
          @input="handleSelection('SearchText', localSearchText)" 
          placeholder="Rechercher..." 
        />
        <div v-if="options.columnsCreate" v-for="column in options.columnsCreate" :key="column[0]">
          <div class="checkbox-wrapper">
            <input type="checkbox" 
                :id="'cbx-' + column[0]" 
                class="inp-cbx" 
                v-model="localColumnVisibility[column[0]]" 
                @change="$emit('toggle-column', column[0])" 
                style="display:none"/>
            <label :for="'cbx-' + column[0]" class="cbx">
              <span class="checkbox-custom"><svg width="12px" height="9px" viewBox="0 0 12 9">
                <polyline points="1 5 4 8 11 1"></polyline>
              </svg></span>
              <span class="label-text">{{ column[1] }}</span>
            </label>
          </div>
        </div>
        <div v-if="options.showTableInOne !== undefined" class="checkbox-wrapper">
          <input type="checkbox" id="tab-cbx-2" class="inp-cbx" v-model="localShowTableInOne" @change="$emit('toggle-display')" style="display:none"/>
          <label class="cbx" for="tab-cbx-2">
            <span class="checkbox-custom"><svg width="12px" height="9px" viewBox="0 0 12 9"><polyline points="1 5 4 8 11 1"></polyline></svg></span>
            <span class="label-text">Un seul tableau</span>
          </label>
        </div>
        <div v-if="!localShowTableInOne && options.hideAllElements !== undefined" class="checkbox-wrapper">
          <input type="checkbox" id="tab-cbx-1" class="inp-cbx" v-model="localHideAllElements" @change="hideAllElements" style="display:none"/>
          <label class="cbx" for="tab-cbx-1">
            <span class="checkbox-custom"><svg width="12px" height="9px" viewBox="0 0 12 9"><polyline points="1 5 4 8 11 1"></polyline></svg></span>
            <span class="label-text">Réduire les tableaux</span>
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      options: Object
    },
    data() {
      return {
        isWrapChoixVisible: false,
        localSelectedPlateforme: this.options.selectedPlateforme || 'tous',
        localSelectedMonth: this.options.selectedMonth || 'tous',
        localSelectedYear: this.options.selectedYear || 'tous',
        localSelectedTag: this.options.selectedTag || 'tous',
        localSearchText: this.options.searchText || '',
        localColumnVisibility: this.options.columnVisibility || {},
        localShowTableInOne: this.options.showTableInOne || false,
        localHideAllElements: this.options.hideAllElements || false
      }
    },
    watch: {
      'options.selectedPlateforme'(newValue) {
        this.localSelectedPlateforme = newValue
      },
      'options.selectedMonth'(newValue) {
        this.localSelectedMonth = newValue
      },
      'options.selectedYear'(newValue) {
        this.localSelectedYear = newValue
      },
      'options.selectedTag'(newValue) {
        this.localSelectedTag = newValue
      },
      'options.searchText'(newValue) {
        this.localSearchText = newValue
      },
      'options.columnVisibility': {
        handler(newValue) {
          this.localColumnVisibility = { ...newValue }
        },
        deep: true
      },
      'options.showTableInOne'(newValue) {
        this.localShowTableInOne = newValue
      },
      'options.hideAllElements'(newValue) {
        this.localHideAllElements = newValue
      }
    },
    methods: {
      toggleWrapChoix() {
        this.isWrapChoixVisible = !this.isWrapChoixVisible
      },
      handleSelection(type, value) {
        this.$emit('selection-change', { type, value })
      },
      hideAllElements() {
        this.localHideAllElements = !this.localHideAllElements
        this.$emit('selection-change', { type: 'HideAllElements', value: this.localHideAllElements })
      }
    },
    
  }
  </script>
  