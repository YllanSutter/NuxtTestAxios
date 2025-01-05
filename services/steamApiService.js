// services/steamApiService.js
const API_KEY = '7AEBB6C629BC5A5CE294B96F09881111';
const BASE_URL = 'https://api.steampowered.com/';

export async function getOwnedGames(steamId) {
    try {
        const response = await fetch(`${BASE_URL}IPlayerService/GetOwnedGames/v1/?key=${API_KEY}&steamid=${steamId}&include_appinfo=1&include_played_free_games=1`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des jeux.');
        }
        const data = await response.json();
        return data.response.games;
    } catch (error) {
        console.error('Erreur lors de la récupération des jeux:', error);
        return [];
    }
}