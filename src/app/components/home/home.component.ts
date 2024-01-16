import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../../shared.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private translateService:TranslateService){
  }
  changeLanguage(){
    if(this.translateService.currentLang=='tr'){
      this.translateService.use("en")
    }
    else{
      this.translateService.use("tr")
    }
  }
}
