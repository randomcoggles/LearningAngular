import { Component, OnInit } from '@angular/core';
import { Hero } from '../_models/hero';
import { HEROES } from '../_models/mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  //styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;

  heroes: Hero[];

  heroServiceMessages = {
    errorInGet: '', // if there's a post
    errorInPost: '', // if there's a post
    loadingMsg: 'strng',
    // loadingSuccessfulMsg: '' // Mostly used for post messages
  };

  constructor(public  heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  getHeroes() {
    this.heroServiceMessages.loadingMsg = 'Loading heroes...';
    this.heroService.getHeroes().subscribe((heroes: Hero[]) => {
      this.heroServiceMessages.loadingMsg = '';
      this.heroes = heroes;
    });
  }
}
