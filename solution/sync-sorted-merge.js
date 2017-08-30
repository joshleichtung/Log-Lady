'use strict'
const Heap = require('heap')

module.exports = (logSources, printer) => {
  let logHeap = new Heap((a, b) => a.log.date - b.log.date)
  logSources.forEach((log, i) => logHeap.push({sourceIndex: i, log: log.pop()}))

  while(!logHeap.empty()){
    let toPrint = logHeap.pop()
    printer.print(toPrint.log)
    let next = logSources[toPrint.sourceIndex].pop()
    next && logHeap.push({sourceIndex: toPrint.sourceIndex, log: next})
  }

  printer.done()
}
