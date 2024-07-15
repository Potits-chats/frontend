import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Message, Utilisateur } from '../../../interfaces/interfaces';
import { WebSocketService } from '../../../services/web-socket.service';
import { AppService } from '../../../services/app.service';
import Pusher from 'pusher-js';


@Component({
  selector: 'app-tchat-message',
  templateUrl: './tchat-message.component.html',
  styleUrls: ['./tchat-message.component.scss']
})


export class TchatMessageComponent {
  username: String = '';
  message = '';

  
  messages: Message[] = [
    // exemple de données initiales
    { username: 'Alice', message: 'Bonjour' },
    { username: 'Bob', message: 'Comment ça va ?' }
  ];

  constructor(
    public auth: AuthService,
    private appService: AppService,
    ) {
    this.auth.user$.subscribe((user) => {
      if (user && user.name){
        this.username = user.name;
      }
    });
  }

  
  ngOnInit() {
    Pusher.logToConsole = true;

    const pusher = new Pusher('29fdd82357f17b9e1f8e', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => this.messages.push(data));
  }

  submit(): void {
    this.appService.sendMessage(this.username, this.message).subscribe(
      () => this.message = ''
    );
  }

  handleMessageChange(event: Event): void {
    this.message = (event.target as HTMLInputElement).value;
  }

}
