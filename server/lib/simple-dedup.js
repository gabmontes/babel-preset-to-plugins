module.exports = list => list.reduce((acc, item) => acc.includes(item) ? acc : acc.concat(item), [])
