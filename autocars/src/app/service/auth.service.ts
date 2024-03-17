import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

interface User {
  username: string;
  password: string;
  role: string; // Ajoutez la propriété du rôle de l'utilisateur
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private userList: User[] = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'chauffeur', password: 'chauffeur123', role: 'chauffeur' },
    { username: 'guest', password: 'guest123', role: 'guest' }
    // Ajoutez d'autres utilisateurs avec leurs informations d'identification et rôles ici
  ];

  constructor(private router: Router) { }

  login(username: string, password: string): Observable<boolean> {
    const matchedUser = this.userList.find(user => user.username === username && user.password === password);
    if (matchedUser) {
      this.isAuthenticatedSubject.next(true);
      this.router.navigate([matchedUser.role]); // Naviguer en fonction du rôle de l'utilisateur
      return of(true);
    } else {
      this.isAuthenticatedSubject.next(false);
      return of(false);
    }
  }
  
  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
