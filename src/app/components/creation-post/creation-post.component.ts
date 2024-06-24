import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { Chat, Sexe } from 'src/app/interfaces/interfaces';
import { FileUploadEvent } from 'primeng/fileupload';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-creation-post',
  templateUrl: './creation-post.component.html',
  styleUrls: ['./creation-post.component.scss'],
  providers: [MessageService]
})
export class CreationPostComponent {

  chat: Chat | undefined;
  sexe = Sexe;
  chatForm: FormGroup;
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService,
    private fb: FormBuilder,
    private appService: AppService,
    private sanitizer: DomSanitizer,

  ) {
    this.chatForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      age: ['', [Validators.required, Validators.minLength(1)]],
      vaccinations: [''],
      ententeChat: [''],
      ententeChien: [''],
      ententeEnfant: [''],
      race: [''],
      sexe: ['', Validators.required],
      couleur: [''],
      contactTel: [''],
      contactEmail: [''],
      contactUrl: [''],
      association: [''],
      typeFoyerMaison: [''],
      typeFoyerAppartement: [''],
      dateNaissance: [''],
    });
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  
  onSubmit() {
    console.log('Form Data:', this.chatForm.valid);
    if (this.chatForm.valid) {
      console.log('Form Data:', this.chatForm.value);
      this.appService.createChat(this.chatForm.value).subscribe({
        next: (response) => {
          console.log('response:', response);
          this.show('success');
          this.chatForm.reset();
        },
        error: (error) => {
          console.error('error:', error);
          this.show('error');
        }
      });
    }
  }

  onUpload(event: FileUploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  show(status: string) {
    if (status === 'success') {
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Votre chat a bien été ajouté !' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue !' });
    }
  }
}
