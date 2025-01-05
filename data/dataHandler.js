// dataHandler.js
const dataKey = 'tableData';

function saveData(data) {
  const jsonData = JSON.stringify(data);
  localStorage.setItem(dataKey, jsonData);
}

function loadData() {
  const savedData = localStorage.getItem(dataKey);
  if (savedData) {
    return JSON.parse(savedData);
  }
  return [];
}

module.exports = { saveData, loadData };