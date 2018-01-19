import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddChallengePage } from '../add-challenge/add-challenge';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items;

  constructor(public navCtrl: NavController) {

  }

  addItem(): void{
      this.navCtrl.push(AddChallengePage);
  }

  ionViewDidLoad(){
    this.items = [
      {title:'test',description:'lorem ipesm'}
    ];

  }

  viewItems(){

  }
}
