import { Component, Inject } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { Association } from '../../../interfaces/interfaces';
import { faLocationDot, faPen } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-associations-list',
  templateUrl: './associations-list.component.html',
  styleUrls: ['./associations-list.component.scss'],
})
export class AssociationsListComponent {
  isLoaded: boolean = false;
  isAuthenticated: boolean = false;
  faLocationDot = faLocationDot;
  faPen = faPen;

  associationForm!: FormGroup;


  constructor(
    private appService: AppService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    private fb: FormBuilder
  ) {}

  associations: Association[] = [];
  private subscriptions = new Subscription();
  
  async ngOnInit() {
    this.getAssociations();
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


  getAssociations() {
    const associationSubscription = this.appService.getAllAssociations().subscribe({
      next: (associations) => {
        this.associations = associations;
        this.isLoaded = true;
      },
      error: (error) => {
        const errorText = 'Erreur lors de la récupération des associations';
        console.error(errorText, error);
        this.toastr.error(errorText, 'Erreur');
      },
      complete: () => console.log('Associations chargées')
    });

    this.subscriptions.add(associationSubscription);
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
