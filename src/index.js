const electron = require('electron');
const { remote, ipcRenderer } = electron;
const { BrowserWindow } = remote;
const path = require('path');
const Axios = require('axios')

const notifyBtn = document.getElementById('notifyBtn')
let price = document.querySelector('h1')
const targetPrice = document.getElementById('targetprice')

let targetPriceVal

const notification = {
  title: 'BTC Alert',
  body: 'BTC just beat your target price',
  icon: 'https://s3.amazonaws.com/coursetro/tutorial_images/up.svg'
  // icon: path.join(__dirname, '../assets/icon/icon.png');
}

const getBtc = () => {
  Axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(res => {
      let cryptos = res.data.BTC.USD
      price.innerHTML = '$' + cryptos.toLocaleString('en')

      if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD) new window.Notification(notification.title, notification);
    })
}

getBtc()
setInterval(getBtc, 10000);

notifyBtn.addEventListener('click', event => {
  const modalPath = path.join('file://', __dirname, 'add.html')
  let win = new BrowserWindow({ frame: false, transparent: true, alwaysOnTop: true, width: 400, height: 200 })

  win.on('close', () => win === null)

  win.loadURL(modalPath)
  win.show()
})

ipcRenderer.on('targetPriceVal', (event, arg) => {
  targetPriceVal = Number(arg)
  targetPrice.innerHTML = '$' + targetPriceVal.toLocaleString('en')

})