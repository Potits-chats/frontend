import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { AuthService } from '@auth0/auth0-angular';
import { WebSocketService } from '../../../services/web-socket.service';
import { Message, Utilisateur } from '../../../interfaces/interfaces';
import { Conversation } from '../../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tchat-message',
  templateUrl: './tchat-message.component.html',
  styleUrls: ['./tchat-message.component.scss'],
})
export class TchatMessageComponent implements OnInit, OnChanges {

  @Input() selectedConversation: Conversation | null = null;
  @Input() utilisateur: Utilisateur | null = null;
  @Input() idFromUrl: number | null = null;

  associationId: number | undefined = undefined;
  utilisateurId: number | undefined = undefined;
  message = '';
  messages: Message[] = [];

  constructor(
    public auth: AuthService,
    private appService: AppService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.messages = [];
    if (this.idFromUrl) {
      this.associationId = this.idFromUrl;
      this.appService.getByIdAsso(this.idFromUrl).subscribe((association) => {
        this.selectedConversation = association as unknown as Conversation;
        this.associationId = this.selectedConversation!.id;
        this.utilisateurId = this.utilisateur!.id;
        this.loadMessages();
      });
    }else {
      this.calculateIds();
      this.loadMessages();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedConversation'] && this.selectedConversation) {
      this.messages = [];
      this.calculateIds();
      this.loadMessages();
    }
  }

  calculateIds(): void {
    if (this.utilisateur) {
      if (this.utilisateur.isAssociation) {
        if (this.selectedConversation?.id) {
          this.utilisateurId = this.selectedConversation.id;
        }
        this.associationId = this.utilisateur.associationId;
      } else {
        this.utilisateurId = this.utilisateur.id;
        if (this.selectedConversation?.id) {
          this.associationId = this.selectedConversation.id;
        }
      }
    }
  }

  loadMessages(): void {
    if (this.utilisateur && this.utilisateurId && this.associationId) {
      this.appService.getMessages(this.utilisateurId!, this.associationId).subscribe((messages: Message[]) => {
        this.messages = messages;
      });
      this.listenForNewMessages();
    }
  }

  listenForNewMessages(): void {
    this.webSocketService.subscribeToChannel(`association-${this.associationId}-user-${this.utilisateurId}`, 'new-message', (data: Message) => {
      if (!this.messages.some(message => message.id === data.id)) {
        this.messages.push(data);
      }
    })
  };
    

  submit(): void {
    if (this.utilisateurId && this.associationId) {
      this.appService.sendMessage(this.utilisateurId, this.associationId, this.message, !this.utilisateur?.isAssociation).subscribe(() => {
        this.message = '';
      });
    }
  }
}
