var store = require('./')
var blob = store()

blob.createWriteStream({ key: 'cool' }).end('beans', readback)

function readback () {
  blob.createReadStream({ key: 'cool' }).on('data', ondata)
  function ondata (buf) {
    console.log(buf.toString())
  }
}
