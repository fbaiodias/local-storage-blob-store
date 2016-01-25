var from = require('from2-array')
var concat = require('concat-stream')
var crypto = require('crypto')

var localStorage = window.localStorage

module.exports = BlobStore

function BlobStore (opts) {
  if (!(this instanceof BlobStore)) return new BlobStore(opts)

  if (typeof opts === 'string') opts = { name: opts }
  this.name = opts && opts.name || ''
}

BlobStore.prototype.createWriteStream = function (opts, cb) {
  var self = this

  if (typeof opts === 'function') return this.createWriteStream(null, opts)
  if (typeof opts === 'string') opts = { key: opts }
  if (!opts) opts = {}
  if (!cb) cb = noop

  return concat(done)

  function done (contents) {
    var key = opts.key || crypto.createHash('sha1').update(contents).digest('hex')
    localStorage.setItem(self.name + key, contents.toString('hex'))
    cb(null, {key: key, size: contents.length, name: opts.name})
  }
}

BlobStore.prototype.createReadStream = function (opts) {
  if (typeof opts === 'string') opts = { key: opts }

  var buff = localStorage.getItem(this.name + opts.key)
  var stream
  if (!buff) {
    stream = from([])
    stream.destroy(new Error('Blob not found'))
  } else {
    stream = from([new Buffer(buff, 'hex')])
  }
  return stream
}

BlobStore.prototype.exists = function (opts, cb) {
  if (typeof opts === 'string') opts = { key: opts }
  cb(null, !!localStorage.getItem(this.name + opts.key))
}

BlobStore.prototype.remove = function (opts, cb) {
  if (typeof opts === 'string') opts = { key: opts }
  if (!cb) cb = noop

  localStorage.removeItem(this.name + opts.key)
  cb()
}

function noop () {}
