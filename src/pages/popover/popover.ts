import { Component } from '@angular/core';
import { ViewController , NavController, NavParams } from 'ionic-angular';
import { ViewChallengesPage } from '../view-challenges/view-challenges';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');

  }
  viewProfile(){
    let items = this.navParams.data.Data;
    let lengthItems = this.navParams.data.Data.length;
    this.navCtrl.push(ProfilePage, {
      items: items,
      lengthItems:lengthItems
    });
  }
  viewChallenges(){
    let items = this.navParams.data.Data;
    this.navCtrl.push(ViewChallengesPage, {
        items:items
    });
  }

}
