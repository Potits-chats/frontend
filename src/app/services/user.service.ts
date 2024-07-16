import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, share, take } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { Conversation, UserRole, Utilisateur } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isAdmin = false;
  public isAsso = false;
  public isUser = false;
  api = environment.urlAPI;
  public user: Utilisateur | null = null;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.auth.user$.subscribe((user) => {
      console.log('🚀 ~ UserService ~ this.auth.user$.subscribe ~ user:', user);
      if (user) {
        const roles = user['roles'] || user['https://potits-chats.com/roles'];
        this.isAdmin = this.isRole(roles, UserRole.Admin);
        if (this.isAdmin) {
          this.isAsso = true;
        } else {
            this.isAsso = this.isRole(roles, UserRole.Asso);
        }
        this.isAsso = this.isRole(roles, UserRole.Asso);
        this.isUser = true;

        this.getMeInfo().subscribe((res) => {
          this.user = res;
        });
      }
    });
  }

  getUsers(id: number): Observable<any> {
    return this.http.get(this.api + '/users/' + id).pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }

  getMeInfo(): Observable<any> {
    return this.http.get(this.api + '/users/infos').pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.api}/messages/conversations`).pipe(
      map((res: any) => res),
      share(),
      take(1)
    );
  }

  private isRole(roles: string[], role: UserRole): boolean {
    return roles && roles.includes(role);
  }
}
