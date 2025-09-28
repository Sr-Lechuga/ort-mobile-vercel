const checkOwnership = async (res, docFindFn, docId, docModelName, docOwnerId) => {
  const doc = await docFindFn(docId)
  if (!doc) {
    res.status(400).json({ message: `El recurso ${docModelName} no existe o es incorrecto` })
    return false
  }
  // OWNERSHIP CHECK
  if (doc.owner != docOwnerId) {
    res.status(409).json({ message: `El recurso ${docModelName} no te pertenece` })
    return false
  }

  return true
}

module.exports = {
  checkOwnership
}