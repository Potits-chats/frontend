import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { AuthService } from '@auth0/auth0-angular';
import { WebSocketService } from '../../../services/web-socket.service';
import { Message } from '../../../interfaces/interfaces';
import { Conversation } from '../../../interfaces/interfaces';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tchat-message',
  templateUrl: './tchat-message.component.html',
  styleUrls: ['./tchat-message.component.scss'],
})
export class TchatMessageComponent implements OnInit, OnChanges {

  @Input() selectedConversation: Conversation | null = null;
  associationId: number = 1; // Remplacez par l'ID de l'association appropriée
  idFromUrl: number | null = null;
  isAssociation = false;
  utilisateurId: number = 1; // Remplacez par l'ID de l'utilisateur approprié
  message = '';
  messages: Message[] = [];

  constructor(
    public auth: AuthService,
    private appService: AppService,
    private webSocketService: WebSocketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idFromUrl = params['id'];
      if (idFromUrl) {
        this.idFromUrl = +idFromUrl;
        this.associationId = this.idFromUrl;
        this.loadMessages();
        this.appService.getByIdAsso(this.idFromUrl).subscribe((association) => {
          this.selectedConversation = association as unknown as Conversation;
        });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedConversation'] && this.selectedConversation) {
      this.isAssociation = !!this.selectedConversation.img ? true : false;
      console.log('🚀 ~ TchatMessageComponent ~ ngOnChanges ~ this.isAssociation:', this.isAssociation);
      this.associationId = this.selectedConversation.id;
      this.loadMessages();
    }
  }

  loadMessages(): void {
    if (this.selectedConversation || this.idFromUrl) {
      this.appService.getMessages(this.utilisateurId, this.associationId).subscribe((messages: Message[]) => {
        this.messages = messages;
        console.log('🚀 ~ TchatMessageComponent ~ this.appService.getMessages ~ this.messages:', this.messages);
      });
      // Subscribe to WebSocket messages
      this.webSocketService.subscribeToChannel(`association-${this.associationId}-user-${this.utilisateurId}`, 'new-message', (data: Message) => {
        this.messages.push(data);
      });
    }
  }

  submit(): void {
    this.appService.sendMessage(this.utilisateurId, this.associationId, this.message, !this.isAssociation).subscribe(() => {
      this.message = '';
    });
  }
}
