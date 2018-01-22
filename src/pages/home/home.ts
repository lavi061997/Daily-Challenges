import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddChallengePage } from '../add-challenge/add-challenge';
import { ViewChallengesPage } from '../view-challenges/view-challenges';
import { ChallengeServiceProvider } from '../../providers/challenge-service/challenge.service';
import { DataProvider } from '../../providers/data/data';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [];
  public currentItem;
  public title;
  public description;
  constructor(private challenge: ChallengeServiceProvider, public navCtrl: NavController, public modalCtrl: ModalController, public dataService: DataProvider) {


    this.dataService.getData().then((challenges) => {

      if(challenges){
        this.items = challenges;
      }

    })
    .catch((w)=> console.log(w));


  }

 addItem(){

   let addModal = this.modalCtrl.create(AddChallengePage,{currentItem: this.currentItem});

   addModal.onDidDismiss((item) => {

         if(item){
           this.saveItem(item);
         }

         this.challengeDone();
   });

   addModal.present();

 }

  getRandomChallenge():void {
   this.challenge.mockGetChallenge(Math.floor(Math.random() * 2)).subscribe((data) => {
    console.log(data);
    this.currentItem = data;
    this.title = data.title;
    this.description = data.description;
    console.log(this.title,this.description);
   });
 }

  ionViewDidLoad() {
    this.currentItem = {
      title:'test',
      description:'loren ipsem'
    };
    this.title = this.currentItem.title;
    this.description = this.currentItem.description;
  }

   saveItem(item){
     this.items.push(item);
     this.dataService.save(this.items);
   }
   challengeDone(): void{
     this.title = "Congrats to you for completing this challenge";
     this.description = "Come back tomorrow for a new Challenge";
   }
   viewChallenges() {
    this.navCtrl.push(ViewChallengesPage, {
      items:this.items
    });
  }
}
