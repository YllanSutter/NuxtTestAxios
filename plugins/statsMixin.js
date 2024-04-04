// plugins/statsMixin.js

export default {
    methods: {
        updateTable() {
            // Appeler la méthode pour recalculer les totaux par mois en fonction des filtres sélectionnés
            this.calculateTotalsByMonth();
        },
        calculateTotalsByMonth() {
            const totalsByMonth = {};
            const monthsOrder = {
                janvier: 0,
                février: 1,
                mars: 2,
                avril: 3,
                mai: 4,
                juin: 5,
                juillet: 6,
                aout: 7,
                septembre: 8,
                octobre: 9,
                novembre: 10,
                décembre: 11
            };
        
            this.filteredTables.forEach((table) => {
                const month = table.mois;
        
                const totalPrixHorsSoldes = table.filteredItems.reduce((acc, filteredItems) => acc + parseFloat(filteredItems.prixHorsSoldes || 0), 0);
                const totalPrixBas = table.filteredItems.reduce((acc, filteredItems) => acc + parseFloat(filteredItems.prixbas || 0), 0);
                const totalPrixMarcheNoir = table.filteredItems.reduce((acc, filteredItems) => acc + parseFloat(filteredItems.prixbasmarche || 0), 0);
                const totalHoursPlayed = table.filteredItems.reduce((acc, filteredItems) => acc + (parseFloat(filteredItems.heuresJouees) || 0), 0);
                const totalnombreJeux = table.filteredItems.length;
        
                // Calcul du coût total à partir de table.cout
                const totalCout = parseFloat(table.cout) || 0;
        
                // Calcul du nombre total d'articles
                const totalItemCount = totalnombreJeux;
        
                const totalPrixPaye = this.calculatePrixPaye(totalCout, totalItemCount);
        
                if (!totalsByMonth[month]) {
                    totalsByMonth[month] = {
                        totalHoursPlayed: totalHoursPlayed,
                        totalPrixHorsSoldes: totalPrixHorsSoldes,
                        totalPrixBas: totalPrixBas,
                        totalPrixMarcheNoir: totalPrixMarcheNoir,
                        totalnombreJeux: totalnombreJeux,
                        totalCout: totalCout, // Ajout du total coût par mois
                        totalPrixPaye: totalPrixPaye // Ajout du total payé par mois
                    };
                } else {
                    totalsByMonth[month].totalHoursPlayed += totalHoursPlayed;
                    totalsByMonth[month].totalPrixHorsSoldes += totalPrixHorsSoldes;
                    totalsByMonth[month].totalPrixBas += totalPrixBas;
                    totalsByMonth[month].totalPrixMarcheNoir += totalPrixMarcheNoir;
                    totalsByMonth[month].totalnombreJeux += totalnombreJeux;
                    totalsByMonth[month].totalCout += totalCout; // Ajout du total coût par mois
                    totalsByMonth[month].totalPrixPaye += totalPrixPaye; // Ajout du total payé par mois
                }
            });
        
            const sortedTotals = Object.fromEntries(
                Object.entries(totalsByMonth)
                    .sort(([monthA], [monthB]) => monthsOrder[monthA] - monthsOrder[monthB])
            );
        
            // Stocker les totaux par mois dans monthlyTotals
            this.monthlyTotals = sortedTotals;
        },
    
        getTotalOfTotals(property) {
            let total = 0;
            for (const month in this.monthlyTotals) {
            total += this.monthlyTotals[month][property];
            }
            return total;
        },
    
        calculateBarHeight(value, maxValue) {
            const maxHeight = 200; // Hauteur maximale des barres
    
            // Calcul de la hauteur de la barre en fonction de la valeur, de la hauteur maximale et de la valeur maximale des données
            return `${(value / maxValue) * maxHeight}px`;
        },
    
        calculateMaxValue(property) {
            let maxValue = 0;
    
            for (const month in this.monthlyTotals) {
            maxValue = Math.max(maxValue, this.monthlyTotals[month][property]);
            }
    
            return maxValue * 1.1;
        },
        }
  };  