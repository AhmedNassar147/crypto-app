const electron = require('electron');
const path = require('path');
const { remote, ipcRenderer } = electron;


const closeBtn = document.getElementById('closeBtn')
const updateBtn = document.getElementById('updateBtn')


closeBtn.addEventListener('click', event => {
  const window = remote.getCurrentWindow();
  window.close();
})


updateBtn.addEventListener('click', event => {
  ipcRenderer.send('update-notify-value', document.getElementById('notifyVal').value)
  const window = remote.getCurrentWindow();
  window.close();
})
