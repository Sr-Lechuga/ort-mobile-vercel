/*
  CATEGORIAS:
  Social/comunitario: apoyo a personas en situación de vulnerabilidad, ancianos, niños, refugiados.
  Ambiental: limpieza de playas, reforestación, conservación de fauna.
  Educativo/cultural: talleres, alfabetización, promoción del arte y la cultura.
  Salud: campañas de donación de sangre, jornadas médicas, apoyo en hospitales.
  Emergencias: ayuda en desastres naturales o crisis humanitarias.
*/

// ISODate format: YYYY-MM-DDTHH:mm:ssZ

const activities = [
  {
    id: 'a1',
    owner: 'o1',
    title: 'Actividad 1',
    categories: ['comunitario'],
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt enim quaerat quo adipisci perferendis impedit culpa, sapiente ullam laudantium eos.\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores eveniet cupiditate reprehenderit, molestias dicta, vitae, animi magni nemo dignissimos iste quasi distinctio consectetur iure laboriosam nostrum? Nulla, dolorum? Saepe delectus, minima dolore molestiae distinctio ex voluptatem tenetur natus porro nulla?',
    date: new Date('2025-11-05T15:30:00Z'),
    status: 'programado',
    open: true,
    volunteers: [
      { id: 'v1', username: 'marcos123', name: 'Marcos Veraniego', email: 'marcos@marcos.com' },
      { id: 'v2', username: 'maria123', name: 'Maria Algo', email: 'maria@maria.com' }
    ]
  },
  {
    id: 'a2',
    owner: 'o2',
    title: 'Actividad 2',
    categories: ['ambiental'],
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi voluptatum eligendi ex et eum fugiat?\nSit, amet consectetur adipisicing elit. Corrupti sequi nulla fugit aperiam delectus officiis dolorum unde, reiciendis veritatis pariatur aut ipsum consectetur, suscipit eos eum quae consequuntur temporibus duot.',
    date: new Date('2025-11-12T20:00:00Z'),
    status: 'programado',
    open: true,
    volunteers: [
      { id: 'v1', username: 'marcos123', name: 'Marcos Veraniego', email: 'marcos@marcos.com' },
      { id: 'v3', username: 'virginia123', password: 'virginia123', name: 'Virginia Bentancour', email: 'virginia@virginia.com' }
    ]
  },
]

module.exports = activities