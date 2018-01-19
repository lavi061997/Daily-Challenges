import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddChallengePage } from '../add-challenge/add-challenge';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [];
  public currentItem;
  public title;
  public description;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

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


  ionViewDidLoad(){
    this.currentItem = {
      title:'test',
      description:'loren ipsem'
    };
    this.title = this.currentItem.title;
    this.description = this.currentItem.description;
  }

   saveItem(item){
     this.items.push(item);
   }
   challengeDone(): void{
     this.title = "Congrats you completed this challenge";
     this.description = "Come back tomorrow for a new Challenge";
   }
  viewItems(){

  }
}
