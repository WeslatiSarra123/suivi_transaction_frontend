import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environment/environement';
export class Message {
  constructor(public content: string, public sender: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = `https://dialogflow.googleapis.com/v2/projects/${environment.projectId}/agent/sessions/524563:detectIntent`;
  private token = environment.dialogflow.accessToken;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    })
  };

  private conversationSource = new BehaviorSubject<Message[]>([]); // Holds the conversation
  conversation = this.conversationSource.asObservable();  // Expose conversation as Observable

  constructor(private http: HttpClient) {}

  // Method to update the conversation with a new message
  update(msg: Message) {
    const currentMessages = this.conversationSource.value;
    this.conversationSource.next([...currentMessages, msg]);
  }

  // Method to converse with Dialogflow and get the bot's response
  converse(msg: string): Promise<void> {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage); // Add the user message to conversation

    const body = {
      queryInput: {
        text: {
          text: msg,
          languageCode: 'en'
        }
      }
    };

    return this.http.post<any>(this.baseUrl, body, this.httpOptions)
      .toPromise()
      .then(res => {
        const fulfillmentText = res?.queryResult?.fulfillmentText;

        if (fulfillmentText) {
          const botMessage = new Message(fulfillmentText, 'bot');
          this.update(botMessage); // Add bot response to conversation
        }
      })
      .catch(err => {
        console.error('Error occurred while sending request:', err);
      });
  }
}

