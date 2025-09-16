const volunteers = [
  { id: 'v1', username: 'Ana', password: 'a12345', name: 'Ana', age: 22 },
  { id: 'v2', username: 'Gabriel', password: 'g12345', name: 'Gabriel', age: 30 },
  { id: 'v2', username: 'Marcos', password: 'm12345', name: 'Marcos', age: 24 },
]

const organizers = [
  { id: 'o1', username: 'OrgOne', password: 'o12345', name: 'Org One', members: 6 },
  { id: 'o2', username: 'OrgTwo', password: 'o12345', name: 'Org Two', members: 8 },
  { id: 'o2', username: 'OrgThree', password: 'o12345', name: 'Org Three', members: 1 },
]

module.exports = {
  volunteers,
  organizers
}