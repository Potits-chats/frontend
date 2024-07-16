export interface Chat {
  id: number;
  nom: string;
  age: number;
  automatiqueAnnonce: boolean;
  description: string;
  race?: string;
  annonceUrl?: string;
  sterilise?: any;
  vaccinations?: string;
  adopte: boolean;
  histoire?: string;
  type: string;
  sexe: Sexe;
  couleur: string;
  taille: Taille;
  ententeChien?: boolean;
  ententeChat?: boolean;
  ententeEnfant?: boolean;
  typeFoyerMaison?: boolean;
  typeFoyerAppartement?: boolean;
  contactEmail?: string;
  contactTel?: string;
  contactUrl?: any;
  createdAt: string;
  updatedAt: string;
  associationId: number;
  isVisible: boolean;
  association: Association;
  favoris: Favori[];
  photos: Photo[];
  videos: Video[];
  isFavori?: boolean;
}

export interface Photo {
  id: number;
  createdAt: string;
  url: string;
  chatId?: number;
  chat?: Chat;
  associationId?: number;
  association?: Association;
}

export interface Video {
  id: number;
  createdAt: string;
  url: string;
  chatId: number;
  chat: Chat;
}

export interface Utilisateur {
  id: number;
  email: string;
  userId: string;
  img: string;
  nom: string;
  associationId?: number;
  role: Role;
  favoris: Favori[];
  association?: Association;
}

export interface Association {
  id: number;
  nom: string;
  url: string;
  ville: string;
  description?: string;
  shortDescription?: string;
  tel?: string;
  chats: Chat[];
  utilisateurs: Utilisateur[];
  photos: Photo[];
}

export interface Favori {
  id?: number;
  createdAt?: string;
  chatId: number;
  utilisateurId?: number;
  chat?: Chat;
  utilisateur?: Utilisateur;
}

export enum Role {
  ADMIN,
  USER,
  ASSOCIATION,
}

export enum Sexe {
  FEMELLE = 'FEMELLE',
  MALE = 'MALE',
}

export enum Taille {
  PETIT = 'PETIT',
  MOYEN = 'MOYEN',
  GRAND = 'GRAND',
}

export interface ApiResponseModel {
  data: unknown;
  error: AppErrorModel | null;
}

export interface AppErrorModel {
  message: string;
}

export enum UserRole {
  User = 'User',
  Admin = 'Admin',
  Asso = 'Asso'
}


// PrimeNG Paginator
export interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}


export interface Message {
  id: number;
  contenu: string;
  createdAt: Date;
  utilisateursId: number;
  associationsId: number;
  isUserSender: boolean;
}

export interface Conversation {
  id: number;
  nom: string;
  img?: string;
  messages: Message[];
  photos?: Photo[];
  associationId?: number;
}