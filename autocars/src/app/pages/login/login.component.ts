import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent  {
  ereure: string;
  /*username: string;
  password: string;
  error: string;
  returnUrl: string;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (success) => {
        if (success) {
          // Authentification réussie, rediriger vers returnUrl
          this.router.navigateByUrl(this.returnUrl);
        } else {
          // Authentification échouée, afficher un message d'erreur
          this.error = 'Identifiant ou mot de passe incorrect.';
        }
      }
    );
  }
*/

constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router , private http:HttpClient,private formBuilder:FormBuilder) {
}
loginForm!: FormGroup;
ngOnInit(): void {
  this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
}
email: string = "";
password: string="";
  login() {
    this.email = this.loginForm.value.email;
    this.password= this.loginForm.value.password;

    let url: string;
    let navigation:string;
    if (this.email.endsWith("@picosoft.chauffeur.com")) {
      url = 'http://localhost:8081/login/chauffeur';
      navigation = '/ec';
    } 
    else if (this.email=="admin@picosoft.admin.com") {
     
      navigation = '/dashboard';
      this.router.navigate(['/dashboard']);
    }
    
    else{
      // handle invalid email
      this.ereure=("invalid e mail or password ");
      return;
    }
    this.http.post(url, { email: this.email, password: this.password }).subscribe(
      user => {
          console.log(url);
          this.router.navigate([navigation])
          localStorage.setItem('user',JSON.stringify(user));
      },
      error => {
       
      }
    );
  }

  backtohome(){
    this.router.navigate(['/home'])
  }
}

