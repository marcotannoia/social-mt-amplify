import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'postImages',
  access: (allow) => ({
    'public/': [
      // utenti autenticati possono leggere/scrivere immagini
      allow.authenticated.to(['read', 'write']),
    ],
  }),
});
