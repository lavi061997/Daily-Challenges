import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    this.items = [
      {title:'test',description:'lorem ipesm'}
    ];

  }

  addItems(){
    
  }

  viewItems(){

  }
}
