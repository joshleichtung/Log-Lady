'use strict'
const Heap = require('heap')
const P = require('bluebird')
const Async = require('async')

module.exports = (logSources, printer) => {
  let logHeap = new Heap((a, b) => a.log.date - b.log.date)

  P.map(logSources, log => log.popAsync())
    .then(logs => {
      logs.forEach((log, i) => logHeap.push({sourceIndex: i, log: log}))
    })
    .then(() => printAndUpdateLogHeap(logHeap, printer, logSources))
}

function printAndUpdateLogHeap(logHeap, printer, logSources) {
  let toPrint = logHeap.pop()
  printer.print(toPrint.log)
  logSources[toPrint.sourceIndex].popAsync()
    .then((nextLog) => {
      nextLog && logHeap.push({sourceIndex: toPrint.sourceIndex, log: nextLog})
      (!logHeap.empty() && printAndUpdateLogHeap(logHeap, printer, logSources)) || printer.done()
    })
    // .reject((err) => console.log(err))
}
