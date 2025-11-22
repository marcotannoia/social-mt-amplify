import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'postImages',
  access: (allow) => ({
    // DEVE finire con "/*"
    'public/*': [
      // utenti autenticati possono leggere/scrivere immagini
      allow.authenticated.to(['read', 'write']),
    ],
  }),
});
