var tape = require('tape')
var tests = require('abstract-blob-store/tests')
var ls = require('./')

var localStorage = window.localStorage

var common = {
  setup: function (t, cb) {
    // make a new blobs instance on every test
    cb(null, ls())
  },
  teardown: function (t, store, blob, cb) {
    localStorage.clear()
    cb()
  }
}

tests(tape, common)
