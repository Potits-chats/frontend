import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AppService } from '../../services/app.service';

import { Conversation, Utilisateur } from '../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tchat',
  templateUrl: './tchat.component.html',
  styleUrls: ['./tchat.component.scss']
})
export class TchatComponent implements OnInit {
  conversations: Conversation[] = [];
  menuVisible = true;
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
}
