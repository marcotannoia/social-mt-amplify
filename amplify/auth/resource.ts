import { defineAuth } from '@aws-amplify/backend';

//questo file definisce il sistema di autenticazione

export const auth = defineAuth({ // si possono registrare solo con email
  loginWith: {
    email: true,
  },
  userAttributes: { // l'utente ha solamente la mail come attrbuto la quale è richiesta e modificabile
    email: {
      required: true,
      mutable: true,
    },
  },
});
