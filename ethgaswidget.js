const api = 'ETHERSCAN-API-KEY';

const params = args.widgetParameter ? args.widgetParameter.split(",") : [];

const isDarkTheme = params?.[0] === 'dark';
const padding = 2;

const widget = new ListWidget();
if (isDarkTheme) {
 widget.backgroundColor = new Color('#1C1C1E');; 
}
widget.setPadding(padding, padding, padding, padding);

widget.url = 'https://etherscan.io/gastracker';

widget.addSpacer(10);

async function buildWidget() {  
    const fastgas = await getFastGas();
    const mediumgas = await getMediumGas();
    const slowgas = await getSlowGas();
  
    addGas('🚀Fastest', ` ${fastgas}`);
    addGas('🚶🏼Medium', ` ${mediumgas}`);
    addGas('🐢Slowest', ` ${slowgas}`);
}

function addGas(gasmode, gasprice) {
    const rowStack = widget.addStack();
   rowStack.setPadding(0, 0, 20, 0);
   rowStack.layoutHorizontally();
  
   const gasmodeStack = rowStack.addStack(); 
   const gaspriceStack = rowStack.addStack(); 
  
   gasmodeStack.setPadding(0, 0, 0, 8);
   gaspriceStack.setPadding(0,0,0,4);
  
   const gasmodeText = gasmodeStack.addText(gasmode);
   gasmodeText.font = Font.mediumSystemFont(16);
  
   const gaspriceText = gaspriceStack.addText(gasprice);
   gaspriceText.font = Font.mediumSystemFont(16);
  
  if (isDarkTheme) {
    gasmodeText.textColor = new Color('#FFFFFF');
  }
}

async function getFastGas() {
    const gas_url = 'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=' + api;
    const req = new Request(gas_url)
    const data = await req.loadJSON() 
  return data.result.FastGasPrice
}

async function getMediumGas() {
    const gas_url = 'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=' + api;
    const req = new Request(gas_url)
    const data = await req.loadJSON() 
  return data.result.ProposeGasPrice
}

async function getSlowGas() {
    const gas_url = 'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=' + api;
    const req = new Request(gas_url)
    const data = await req.loadJSON()  
  return data.result.SafeGasPrice
}

await buildWidget();

Script.setWidget(widget);
Script.complete();
widget.presentSmall();
