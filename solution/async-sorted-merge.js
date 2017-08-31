'use strict'
const Heap = require('heap')
const P = require('bluebird')

module.exports = (logSources, printer) => {
  let logHeap = new Heap((a, b) => a.log.date - b.log.date)

  P.map(logSources, log => log.popAsync())
    .then(logs => {
      logs.forEach((log, i) => logHeap.push({sourceIndex: i, log: log}))
    })
    .then(() => printAndUpdateLogHeap())

  function printAndUpdateLogHeap() {
    let toPrint = logHeap.pop()
    printer.print(toPrint.log)

    logSources[toPrint.sourceIndex].popAsync()
      .then(function(nextLog) {
        nextLog && logHeap.push({sourceIndex: toPrint.sourceIndex, log: nextLog})
        logHeap.empty() ? printer.done() : printAndUpdateLogHeap()
      })
  }
}

