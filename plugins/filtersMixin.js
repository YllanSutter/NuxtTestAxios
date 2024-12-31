export default {  
  methods: {
    filterTables() {
      // Vous pouvez accéder au mois sélectionné et à l'année sélectionnée comme ceci :
      const selectedMonth = this.selectedMonth;
      const selectedYear = this.selectedYear;
      const selectedPlateforme = this.selectedPlateforme;
      this.$forceUpdate();
    },
    filterByTag(tag) {
      // Si le wrapChoix est 'Tous les tags', retourne toujours vrai pour afficher toutes les lignes
      if (this.wrapChoix === 'Tous les tags') {
        return true;
      }
      // Retourne vrai si le tag correspond au wrapChoix sélectionné
      // Appel à filterItems() après avoir modifié selectedTag
      return tag === this.wrapChoix;
    },
    handleSelectionChange({ type, value }) {
      switch(type) {
        case 'Plateforme':
          this.selectedPlateforme = value;
          break;
        case 'Month':
          this.selectedMonth = value;
          break;
        case 'Year':
          this.selectedYear = value;
          break;
        case 'Tag':
          this.selectedTag = value;
          this.filterByTag(value);
          break;
        case 'SearchText':
          this.searchText = value;
          break;
        case 'ColumnVisibility':
          this.columnVisibility = value;
          break;
      }
      this.filterTables(); // Appliquez le filtrage après chaque changement
    }
    
  },
  computed: {
    filteredTables() {
      if (this.selectedMonth === 'tous' && this.selectedYear === 'tous' && this.selectedPlateforme === 'tous') {
        return this.tables.map(table => {
          table.filteredItems = table.items.filter(item => {
            const isTagMatch = this.selectedTag === 'tous' || item.tag === this.selectedTag;
            const isSearchMatch = this.searchText === '' ||
              item.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
              table.tableText.toLowerCase().includes(this.searchText.toLowerCase());
            
            return isTagMatch && isSearchMatch;
          });
          return table.filteredItems.length > 0 ? table : null;
        }).filter(table => table !== null);
      }
    
      return this.tables.map(table => {
        const isMonthMatch = this.selectedMonth === 'tous' || table.mois === this.selectedMonth;
        const isYearMatch = this.selectedYear === 'tous' || table.annee === this.selectedYear;
        const isPlateformeMatch = this.selectedPlateforme === 'tous' || table.plateforme === this.selectedPlateforme;
        const isTagMatch = this.selectedTag === 'tous' || table.items.some(item => item.tag === this.selectedTag);
        const isSearchMatch = this.searchText === '' ||
          table.items.some(item => item.name.toLowerCase().includes(this.searchText.toLowerCase())) ||
          table.tableText.toLowerCase().includes(this.searchText.toLowerCase());
        
        table.filteredItems = table.items.filter(item => {
          const isTagMatch = this.selectedTag === 'tous' || item.tag === this.selectedTag;
          const isSearchMatch = this.searchText === '' ||
            item.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
            table.tableText.toLowerCase().includes(this.searchText.toLowerCase());
          
          return isTagMatch && isSearchMatch;
        });
    
        return isMonthMatch && isYearMatch && isPlateformeMatch && table.filteredItems.length > 0 ? table : null;
      }).filter(table => table !== null);
    }
    
  },
}