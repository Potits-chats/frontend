import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-associations-form',
  templateUrl: './associations-form.component.html',
  styleUrls: ['./associations-form.component.scss']
})
export class AssociationsFormComponent {

  associationForm!: FormGroup;
  isAuthenticated: boolean = false;

  constructor(
    private appService: AppService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.isAuthenticated = await firstValueFrom(this.auth.isAuthenticated$);
    this.associationForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      url: ['', Validators.required],
      ville: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      shortDescription: ['', [Validators.required, Validators.minLength(10)]],
      tel: ['', [Validators.required]],
      urlGoogleMapsEmbled: ['', [Validators.required, Validators.minLength(10)]]
    });
  }


  getErrorMessage(controlName: string): string {
    const control = this.associationForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Ce champ est requis';
    }
    if (control?.hasError('minlength')) {
      const minLength = control?.errors?.['minlength'].requiredLength;
      return `Ce champ doit contenir au moins ${minLength} caractères`;
    }
    return '';
  }


  onSubmit() {
    if (this.associationForm.valid) {
      console.log('Form Data:', this.associationForm.value);
      this.appService.createAsso(this.associationForm.value).subscribe({
        next: (response) => {
          console.log('response:', response);
          this.toastr.success('Association créée avec succès, elle va être vérifiée par un administrateur', 'Succès');
          this.associationForm.reset();
        },
        error: (error) => {
          this.toastr.error('Une erreur est survenue, veuillez réessayer plus tard', 'Erreur');
          console.error('error:', error);
        }
      });
    }
  }

  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }
}
