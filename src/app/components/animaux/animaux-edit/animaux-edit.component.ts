import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../services/app.service';
import { UserService } from '../../../services/user.service';
import { Chat, Sexe } from '../../../interfaces/interfaces';
import { faMars, faTrash, faUpload, faVenus, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-animaux-edit',
  templateUrl: './animaux-edit.component.html',
  styleUrls: ['./animaux-edit.component.scss']
})
export class AnimauxEditComponent {
  @Input() chat: Chat | undefined;
  @Input() isCreationMode: boolean = false;
  isLoaded: boolean = false;
  sexe = Sexe;
  faMars = faMars;
  faVenus = faVenus;
  faTrash = faTrash;
  faUpload = faUpload;
  faHeart = faHeart;
  fasHeart = fasHeart;
  dataModel: any;
  isAuthenticated: boolean = false;


  constructor(
    private appService: AppService,
    private toastr: ToastrService,
    public userService: UserService,
  ) {}

  ngOnInit() {
    this.initializeChat();
  }

  private initializeChat() {
    if (!this.chat) {
      this.chat = this.createDefaultChat();
      this.isCreationMode = true;
    } else {
      this.isCreationMode = false;
    }
  }

  private createDefaultChat(): Chat {
    return {
      description: `<p>Le chat est ....</p>
      <p>Voici quelques questions pour vous aider à décrire votre chat :</p>
      <ul>
        <li><strong>Quel est le caractère de votre chat ?</strong> (Est-il joueur, calme, curieux, indépendant ?)</li>
        <li><strong>Comment se comporte-t-il avec les humains ?</strong> (A-t-il une affection particulière pour les adultes ou les enfants ?)</li>
        <li><strong>Votre chat a-t-il une histoire particulière ?</strong> (A-t-il été recueilli ou adopté récemment ?)</li>
        <li><strong>Quelles sont ses habitudes quotidiennes ?</strong> (Est-il plutôt casanier ou aime-t-il explorer l'extérieur ?)</li>
        <li><strong>Est-il sociable avec les autres animaux ?</strong> (Chats, chiens, autres animaux ?)</li>
        <li><strong>Qu'est-ce qui le rend unique ?</strong> (A-t-il des particularités physiques ou comportementales ?)</li>
        <li><strong>Y a-t-il des soins particuliers à prévoir ?</strong> (A-t-il besoin d'un régime spécifique ou de traitements réguliers ?)</li>
      </ul>
      <p>Répondez à ces questions pour compléter la description de votre chat !</p>`,
      ententeChien: true,
      ententeChat: true,
      ententeEnfant: true,
      sexe: Sexe.MALE,
      age: 1,
    } as Chat;
  }

  submitForm() {
    if (!this.isCreationMode) {
      this.updateChat();
    } else {
      this.saveChat();
    }
  }


  saveChat() {
    // Function to create a new chat
    this.appService.createChat(this.chat!).subscribe({
      error: (error) => {
        console.error('error:', error);
        this.toastr.error('Erreur lors de la création du chat');
      },
      complete: () => {
        this.toastr.success('Chat créé avec succès');
      },
    });
  }

  updateChat() {
    this.appService.updateChat(this.chat!).subscribe({
      error: (error) => {
        console.error('error:', error);
        if (error?.error?.message) {
          this.toastr.error(
            error.error.message,
            'Erreur de mise à jour du chat'
          );
        } else {
          this.toastr.error('Erreur de mise à jour du chat');
        }
      },
      complete: () => {
        this.toastr.success('Chat mis à jour avec succès');
      },
    });
  }
}
