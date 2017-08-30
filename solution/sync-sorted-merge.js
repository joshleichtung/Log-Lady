'use strict'

module.exports = (logSources, printer) => {
  let nextLogs = logSources.map((logSource, i) => ({idx: i,  log: logSource.pop()}))
  while(nextLogs.every(log => log.log !== false)){
    let next = nextLogs.slice().sort((a, b) => a.log.date - b.log.date)[0]
    printer.print(next.log)
    nextLogs[next.idx] = {idx: next.idx, log: logSources[next.idx].pop()}
  }

  printer.done()
}
