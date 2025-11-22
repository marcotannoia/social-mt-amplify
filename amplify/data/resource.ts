import { a, defineData } from '@aws-amplify/backend';
//  in questo file vado  a definire l'intero mio database

// schema fisso :
const schema = a.schema({ // relativo ad un singolo post, ha diversi attributi
  Post: a
    .model({
      id: a.id().required(),
      ownerId: a.string().required(),
      imageKey: a.string().required(),
      caption: a.string(),
      createdAt: a.datetime().required(),
    })
    .authorization((allow) => [
      // l’utente autenticato può creare e leggere
      allow.authenticated(),
      // il proprietario può modificare/eliminare
      allow.owner(),
    ]),

  Follow: a // relativo al follow tra utenti, ha un id di follow, id del follower e id del followed
    .model({
      id: a.id().required(),
      followerId: a.string().required(),
      followedId: a.string().required(),
    })
    .authorization((allow) => [
      allow.authenticated(),
      allow.owner(),
    ]),

  Like: a // ogni like invece ha un id, un id del post e un id
    .model({
      id: a.id().required(),
      postId: a.string().required(),
      userId: a.string().required(),
      createdAt: a.datetime().required(),
    })
    .authorization((allow) => [
      allow.authenticated(),
      allow.owner(),
    ]),
});

export const data = defineData({
  schema,
});
