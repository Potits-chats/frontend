import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, share, take } from 'rxjs';
import { Chat, Favori, Association } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  // api dev  = 'http://localhost:3000/v1';
  // api prod = 'https://api.potits-chats.com/v1';
  api = environment.urlAPI;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  getUsers(id: number): Observable<any> {
    return this.http.get(this.api + '/users/' + id).pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }

  getAllCats(filters: any = {}): Observable<Chat[]> {
    let params = new HttpParams();
    if (filters.ville) {
      params = params.append('ville', filters.ville);
    }
    if (filters.race) {
      params = params.append('race', filters.race);
    }
    if (filters.association) {
      params = params.append('associationId', filters.association);
    }
    return this.http.get(this.api + '/chats', { params }).pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }

  getAllAssociations(): Observable<Association[]> {
    return this.http.get(this.api + '/associations').pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }

  getCatByFavoris(): Observable<Chat[]> {
    return this.http.get(this.api + '/chats/favoris').pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }

  getByIdCat(id: number): Observable<Chat> {
    return this.http.get(this.api + '/chats/' + id).pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }

  updateChat(id: number, formData: any): Observable<any> {
    return this.http.put(this.api + `/chats/${id}`, formData).pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }

  createChat(formData: FormData): Observable<any> {
    return this.http.post(this.api + '/chats', formData).pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }

  deleteChatPhoto(photoName: string): Observable<any> {
    return this.http.delete(this.api + `/files/${photoName}`).pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }


  getAllAsso(): Observable<Association[]> {
    return this.http.get(this.api + '/associations').pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }

  getByIdAsso(id: number): Observable<Association> {
    return this.http.get(this.api + '/associations/' + id).pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }

  updateAsso(asso: Association): Observable<Association> {
    return this.http.put(this.api + '/associations/' + asso.id, asso).pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }

  createAsso(asso: Association): Observable<Association> {
    return this.http.post(this.api + '/associations', asso).pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }

  createFavori(favori: Favori): Observable<Favori> {
    return this.http.post(this.api + '/favoris', favori).pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }

  getFavorisByUser(): Observable<number[]> {
    return this.http.get(this.api + '/favoris').pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }

  removeFavoriByCat(id: number): Observable<Favori> {
    return this.http.delete(this.api + '/favoris/' + id).pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }

  getAllConversationByUser(id: number): Observable<any> {
    return this.http.get(this.api + '/conversations').pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }

  getConversationById(id: number): Observable<any> {
    return this.http.get(this.api + '/conversations/' + id).pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }

  sendEmail(data: any): Observable<any> {
    return this.http.post(this.api + '/contact', data).pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }

  sendMessage(userId: number, associationId: number, content: string, isUserSender: boolean) {
    return this.http.post(`${this.api}/messages`, {
      userId,
      associationId,
      content,
      isUserSender,
    }).pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }
  
  getMessages(userId: number, associationId: number) {
    return this.http.get(`${this.api}/messages/${associationId}/${userId}`).pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }


}
