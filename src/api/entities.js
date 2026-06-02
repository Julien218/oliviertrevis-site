// Base44 Entity API stubs — remplacé par l'SDK Base44 en production
const makeEntity = (name) => ({
  list: async (params) => [],
  get: async (id) => null,
  create: async (data) => ({ id: Date.now().toString(), ...data, created_date: new Date().toISOString() }),
  update: async (id, data) => ({ id, ...data }),
  delete: async (id) => true,
  filter: async (params) => [],
});

export const Asbl = makeEntity('Asbl');
export const Evenement = makeEntity('Evenement');
export const Video = makeEntity('Video');
export const Actualite = makeEntity('Actualite');
export const Photo = makeEntity('Photo');
export const Partenaire = makeEntity('Partenaire');
export const Candidature = makeEntity('Candidature');
export const MessageContact = makeEntity('MessageContact');
export const Laureat = makeEntity('Laureat');
export const MascotteReponse = makeEntity('MascotteReponse');
