const logError = (err) => {
  const placeOfError = err.placeOfError || 'Sin Definir'
  const nameOfError = err.name || 'Nombre Sin Definir'
  console.log(`
=========================== ERROR ==============================
=====> LUGAR: [${placeOfError}]
=====> NOMBRE: [${nameOfError}]
=====> DETALLES:
${JSON.stringify(err)}
================================================================
  `)
}

const parseMongooseSchemaErrorMessages = (errorObject) => {
  const { errors } = errorObject
  let messagesArr = []
  for (let err of Object.values(errors)) messagesArr.push(err.properties.message)
  return messagesArr
}

const parseMongoDBErrorMessages = (errorObject) => {
  let message = ''

  // Caso 11000: duplicado
  if (errorObject.code == 11000) {
    let duplicateField = null
    const duplicateKey = errorObject.errorResponse?.keyPattern
    if (duplicateKey) duplicateField = Object.keys(duplicateKey)[0]

    message = `El campo [${translateDocumentFieldName(duplicateField)}] ya ha sido registrado previamente`
  }

  return message
}

function translateDocumentFieldName(fieldName) {
  if (fieldName == 'username') return 'nombre de usuario'
  return fieldName
}

module.exports = {
  logError,
  parseMongooseSchemaErrorMessages,
  parseMongoDBErrorMessages
}