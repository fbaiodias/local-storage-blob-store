# local-storage-blob-store

[blob store](https://github.com/maxogden/abstract-blob-store) that stores blobs on the browser's localStorage

```
npm install local-storage-blob-store
```

[![build status](http://img.shields.io/travis/xicombd/local-storage-blob-store.svg?style=flat)](http://travis-ci.org/xicombd/local-storage-blob-store)

[![blob-store-compatible](https://raw.githubusercontent.com/maxogden/abstract-blob-store/master/badge.png)](https://github.com/maxogden/abstract-blob-store)

## Usage

``` js
var store = require('local-storage-blob-store')
var blob = store()

blob.createWriteStream({ key: 'cool' }).end('beans', readback)

function readback () {
  blob.createReadStream({ key: 'cool' }).on('data', ondata)
  function ondata (buf) {
    console.log(buf.toString())
  }
}
```

## License

MIT
