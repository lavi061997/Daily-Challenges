import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public lengthItems;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  this.lengthItems  = this.navParams.get("lengthItems");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
