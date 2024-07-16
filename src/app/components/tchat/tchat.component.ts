import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Conversation } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tchat',
  templateUrl: './tchat.component.html',
  styleUrls: ['./tchat.component.scss']
})
export class TchatComponent implements OnInit {
  conversations: Conversation[] = [];
  menuVisible = true;
  selectedConversation: Conversation | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getConversations().subscribe(conversations => {
      this.conversations = conversations;
      console.log('🚀 ~ TchatComponent ~ this.userService.getConversations ~ this.conversations:', this.conversations);
    });
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  onSelectConversation(conversation: any) {
    this.selectedConversation = conversation;
  }
}