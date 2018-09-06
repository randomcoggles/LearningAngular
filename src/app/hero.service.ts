import { Injectable } from '@angular/core';
import { Hero } from './_models/hero';
import { HEROES } from './_models/mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }
}
