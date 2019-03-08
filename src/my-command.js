const sketch = require('sketch')
const { DataSupplier } = sketch
const util = require('util')

export function onStartup () {
  // To register the plugin, uncomment the relevant type:
  DataSupplier.registerDataSupplier('public.text', 'Asset ID', 'AssetID');
  DataSupplier.registerDataSupplier('public.text', 'Name', 'AssetName');
}

export function onShutdown () {
  // Deregister the plugin
  DataSupplier.deregisterDataSuppliers()
}

export function onAssetId (context) {
  let dataKey = context.data.key
  const items = util.toArray(context.data.items).map(sketch.fromNative)
  items.forEach((item, index) => {
    let N = 24;
    let data = 'i-' + Array(N+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, N);

    DataSupplier.supplyDataAtIndex(dataKey, data, index)
  })
}

export function onAssetName (context) {
  let dataKey = context.data.key
  const items = util.toArray(context.data.items).map(sketch.fromNative)

  var location = ['us-east', 'us-west', 'eu-east', 'eu-west', 'apac'];
  var env = ['prod', 'test', 'stage', 'dev'];
  var type = ['worker', 'resque', 'db', 'cache', 'magic'];



  items.forEach((item, index) => {
    let data = getVal(location) + "-" + getVal(env) + "-" + getVal(type) + "-" + Math.floor(Math.random() * 999);

    DataSupplier.supplyDataAtIndex(dataKey, data, index)
  })
}

function getVal(array) {
  let length = array.length - 1;
  let loc = Math.floor(Math.random() * length);


  return array[loc];
}
