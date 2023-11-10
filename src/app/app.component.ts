import { Component } from '@angular/core';
import { INote } from './model/INote';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'holamundo';
  
  public alerta(){
    alert("Alerta Roja");
  }

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    
  }

}

