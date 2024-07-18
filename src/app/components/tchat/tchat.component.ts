import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AppService } from '../../services/app.service';

import { Conversation, Utilisateur } from '../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { faCaretSquareRight,  faCaretSquareLeft } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-tchat',
  templateUrl: './tchat.component.html',
  styleUrls: ['./tchat.component.scss']
})
export class TchatComponent implements OnInit {
  conversations: Conversation[] = [];
  menuVisible = true;
  faCaretSquareRight = faCaretSquareRight;
  faCaretSquareLeft = faCaretSquareLeft;
  selectedConversation: Conversation | null = null;
  utilisateur: Utilisateur | null = null;
  idFromUrl: number | null = null;

    constructor(private appService: AppService, private userService: UserService, private route: ActivatedRoute, ) {}

  ngOnInit() {
    this.userService.getMeInfo().subscribe((res) => {
      this.utilisateur = res;
      // Ensure conversations are loaded after utilisateur is set
      this.loadConversations();
    });

    this.route.params.subscribe(params => {
      const idFromUrl = params['id'];
      if (idFromUrl) {
        console.log('🚀 ~ TchatComponent ~ ngOnInit ~ idFromUrl:', idFromUrl);
        this.idFromUrl = +idFromUrl;
        this.appService.getByIdAsso(this.idFromUrl).subscribe((association) => {
          this.selectedConversation = association as unknown as Conversation;
        });
      }
    });
  }

  loadConversations() {
    this.userService.getConversations().subscribe(conversations => {
      this.conversations = conversations;
    });
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  onSelectConversation(conversation: any) {
    this.selectedConversation = conversation;
    if (window.innerWidth < 640) {
      this.menuVisible = false;
    }
  }

    // Fonction pour calculer le temps écoulé depuis la date donnée
  // Fonction pour calculer le temps écoulé depuis la date donnée avec des règles spécifiques
  timeAgo(date: Date): string {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

    let interval = Math.floor(seconds / 60);
    if (interval < 60) {
      return `il y a ${interval} minutes`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval < 24) {
      return `il y a ${interval} heures`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval < 30) {
      return `il y a ${interval} jours`;
    }
    interval = Math.floor(seconds / 2592000); // 30 jours approximatifs
    if (interval < 12) {
      return `il y a ${interval} mois`;
    }
    interval = Math.floor(seconds / 31536000); // 365 jours approximatifs
    return `il y a ${interval} ans`;
  }

  // Fonction pour tronquer le message à 20 caractères
  truncateMessage(message: string): string {
    return message.length > 25 ? `${message.substring(0, 25)}...` : message;
  }
}
