export class Message {
    constructor(
      public content: string,
      public sender: 'user' | 'bot' = 'bot' // Définit si le message vient de l'utilisateur ou du bot
    ) {}
  }