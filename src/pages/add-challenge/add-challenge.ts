import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddChallengePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-challenge',
  templateUrl: 'add-challenge.html',
})
export class AddChallengePage {
  title: string;
  description: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddChallengePage');
    this.title = this.navParams.get('currentItem').title;
    this.description = this.navParams.get('currentItem').description;

    }

    saveItem(){

      let newItem = {
        title: this.title,
        description: this.description
      };

      this.view.dismiss(newItem);

    }

    close(){
      this.view.dismiss();
    }

  }
