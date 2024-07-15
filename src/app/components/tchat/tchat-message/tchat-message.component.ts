import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { AuthService } from '@auth0/auth0-angular';
import { WebSocketService } from '../../../services/web-socket.service';
import { Message } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-tchat-message',
  templateUrl: './tchat-message.component.html',
  styleUrls: ['./tchat-message.component.scss'],
})
export class TchatMessageComponent implements OnInit {
  // @Input() conversationId: number;
  conversationId = 1;
  username: string = '';
  message = '';
  messages: Message[] = [];

  constructor(
    public auth: AuthService,
    private appService: AppService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.username = user.name || 'toto';

        // Call getMessages once user is authenticated
        this.appService.getMessages(this.conversationId).subscribe((messages: Message[]) => {
          this.messages = messages;
          console.log('🚀 ~ TchatMessageComponent ~ this.appService.getMessages ~ this.messages:', this.messages);
        });

        // Subscribe to WebSocket messages once user is authenticated
        this.webSocketService.subscribeToChannel(`conversation-${this.conversationId}`, 'new-message', (data: Message) => {
          this.messages.push(data);
        });
      }
    });
  }

  submit(): void {
    this.auth.user$.subscribe((user) => {
      if (user && user.sub) {
        this.appService.sendMessage(this.conversationId, 1, this.message).subscribe(() => {
          this.message = '';
        });
      }
    });
  }
}
