let results = {}

const clearResults = () => results = {}

const addResult = (socketId, result) => results[socketId] = result

module.exports = {results, clearResults, addResult}