import { a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
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

  Follow: a
    .model({
      id: a.id().required(),
      followerId: a.string().required(),
      followedId: a.string().required(),
    })
    .authorization((allow) => [
      allow.authenticated(),
      allow.owner(),
    ]),

  Like: a
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
