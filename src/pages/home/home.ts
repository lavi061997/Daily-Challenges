import { Component } from '@angular/core';
import { ToastController, ToastOptions, ModalController, NavController } from 'ionic-angular';
import { AddChallengePage } from '../add-challenge/add-challenge';
import { ViewChallengesPage } from '../view-challenges/view-challenges';
import { ChallengeServiceProvider } from '../../providers/challenge-service/challenge.service';
import { DataProvider } from '../../providers/data/data';
import { Shake } from '@ionic-native/shake';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  shakeEvent$: Subscription;
  toastOptions: ToastOptions;
  public items = [];
  public currentItem;
  public title;
  public description;
  constructor(private shake: Shake, private toast:ToastController, private challenge: ChallengeServiceProvider, public navCtrl: NavController, public modalCtrl: ModalController, public dataService: DataProvider) {

    //toastOptions

    this.toastOptions = {
      message:'Challenge was Added!',
      duration:2000
    }

    //dataService

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
         this.showToast();
         this.challengeDone();

   });

   addModal.present();

 }

 showToast(){
  this.toast.create(this.toastOptions).present();
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

    this.shakeEvent$ = this.shake.startWatch().subscribe(()=> this.getRandomChallenge());
  }

  ngOnDestroy(){
    this.shakeEvent$.unsubscribe();
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
