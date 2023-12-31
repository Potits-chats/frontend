import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Chat } from '../../../interfaces/interfaces';
import { AppService } from 'src/app/services/app.service';
import { ActivatedRoute } from '@angular/router';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-animaux-details',
  templateUrl: './animaux-details.component.html',
  styleUrls: ['./animaux-details.component.scss'],
})
export class AnimauxDetailsComponent {
  chat: Chat | undefined;
  faMars = faMars;
  faVenus = faVenus;

  constructor(private route: ActivatedRoute, private appService: AppService) {}

  ngOnInit() {
    this.getCat();
  }

  getCat() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.appService.getByIdCat(params['id']).subscribe((chat) => {
          this.chat = chat;
        });
      }
    });
  }
}
