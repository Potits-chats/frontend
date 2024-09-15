import { Component, ElementRef, Input, ChangeDetectorRef, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../services/app.service';
import { UserService } from '../../../services/user.service';
import { Chat, Photo, Sexe } from '../../../interfaces/interfaces';
import { faMars, faTrash, faUpload, faVenus, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-regular-svg-icons';
import { environment } from 'src/environments/environment';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animaux-edit',
  templateUrl: './animaux-edit.component.html',
  styleUrls: ['./animaux-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class AnimauxEditComponent  implements AfterViewChecked{
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
  selectedFiles: File[] = [];
  s3Url = environment.s3Url;
  constructor(
    private appService: AppService,
    private toastr: ToastrService,
    public userService: UserService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeChat();
  }

  ngAfterViewChecked() {
    // Code à exécuter après que la vue ait été vérifiée
    // this.cdr.detectChanges();
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


  onFileSelected(event: Event, existingPhoto: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
  
      // Replace the existing photo with the new file
      this.replacePhoto(existingPhoto, file);
    }
  }
  
  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.zone.run(() => {
        for (let i = 0; i < input!.files!.length; i++) {
          this.selectedFiles.push(input!.files![i]);
        }
        this.cdr.detectChanges();  // Ou markForCheck ici si OnPush
      });
    }
  }
  
  
  
  replacePhoto(existingPhoto: any, newFile: File) {
    const index = this.chat!.photos.indexOf(existingPhoto);
    if (index > -1) {
      this.chat!.photos.splice(index, 1);
    }
  
    this.selectedFiles.push(newFile);
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }
  
  
  getFileUrl(file: File): string {
    return URL.createObjectURL(file);
  }


  saveChat() {
    const formData = new FormData();
    formData.append('chat', JSON.stringify(this.chat));
  
    this.selectedFiles.forEach((file) => {
      formData.append('photos', file, file.name);
    });
  
    this.appService.createChat(formData).subscribe({
      error: (error) => {
        console.error('error:', error);
        this.toastr.error('Erreur lors de la création du chat');
      },
      next: (chat) => {
        this.toastr.success('Chat créé avec succès');
        this.router.navigate([`/animaux/${chat.id}`]); 
      }
    });
  }

  removePhoto(file : File) {
    const index = this.selectedFiles.indexOf(file);
    if (index > -1) {
      this.selectedFiles.splice(index, 1);
    }
  }

  removePhotoOnline(photoName: string) {
    this.appService.deleteChatPhoto(photoName).subscribe({
      error: (error) => {
        console.error('error:', error);
        this.toastr.error('Erreur lors de la suppression de la photo');
      },
      complete: () => {
        this.chat!.photos = this.chat!.photos.filter((p) => p.url !== photoName);
      },
    });
  }

  
  updateChat() {
    const formData = new FormData();
    formData.append('chat', JSON.stringify(this.chat));
  
    this.selectedFiles.forEach((file) => {
      formData.append('photos', file, file.name);
    });
  
    this.appService.updateChat(this.chat!.id, formData).subscribe({
      error: (error) => {
        console.error('error:', error);
        this.toastr.error('Erreur de mise à jour du chat');
      },
      complete: () => {
        this.toastr.success('Chat mis à jour avec succès');
      },
    });
  }
}
