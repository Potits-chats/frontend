import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfilComponent } from './components/profil/profil.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AnimauxListComponent } from './components/animaux/animaux-list/animaux-list.component';
import { AnimauxDetailsComponent } from './components/animaux/animaux-details/animaux-details.component';
import { DonsComponent } from './components/dons/dons.component';
import { AssociationsListComponent } from './components/associations/associations-list/associations-list.component';
import { AProposComponent } from './components/a-propos/a-propos.component';
import { CguComponent } from './components/cgu/cgu.component';

const routes: Routes = [
  {
    path: 'profil',
    component: ProfilComponent,
  },
  {
    path: 'connexion',
    component: ConnexionComponent,
  },
  {
    path: 'inscription',
    component: InscriptionComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'animaux/:id',
    component: AnimauxDetailsComponent,
  },
  {
    path: 'animaux',
    component: AnimauxListComponent,
  },
  {
    path: 'dons',
    component: DonsComponent,
  },
  {
    path: 'associations',
    component: AssociationsListComponent,
  },
  {
    path: 'a-propos',
    component: AProposComponent,
  },
  {
    path: 'mentions-legales',
    component: CguComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
