import { Component } from '@angular/core';
import { PopoverController, ToastController, ToastOptions, ModalController, NavController } from 'ionic-angular';
import { AddChallengePage } from '../add-challenge/add-challenge';
import { ViewChallengesPage } from '../view-challenges/view-challenges';
import { ChallengeServiceProvider } from '../../providers/challenge-service/challenge.service';
import { DataProvider } from '../../providers/data/data';
import { PopoverPage } from '../popover/popover';
import { ParallaxHeader } from '../../directives/parallax-header/parallax-header';
import { Observable, Subscription } from 'rxjs/Rx';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sub: Subscription;
  toastOptions: ToastOptions;
  public items = [];
  public currentItem;
  public title;
  public description;
  isValid = true;
  ticks = 0;
  public lengthItems = items.length;

  minutesDisplay: number = 0;
  hoursDisplay: number = 0;
  secondsDisplay: number = 0;

  constructor(public popoverCtrl: PopoverController, private toast:ToastController, private challenge: ChallengeServiceProvider, public navCtrl: NavController, public modalCtrl: ModalController, public dataService: DataProvider) {

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

  optionsPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage, {Data: this.items});
    popover.present({
      ev: myEvent
    });
  }

  // timer function

  ngOnInit() {
}

    private startTimer() {
      this.isValid = !this.isValid;
      console.log('start');
        let timer = Observable.timer(1, 1000);
        this.sub = timer.subscribe(
            t => {
                this.ticks = t;

                this.secondsDisplay = this.getSeconds(this.ticks);
                this.minutesDisplay = this.getMinutes(this.ticks);
                this.hoursDisplay = this.getHours(this.ticks);
                if(this.secondsDisplay == 10){
                  this.getRandomChallenge();
                  this.secondsDisplay = 0;
                  this.minutesDisplay = 0;
                  this.hoursDisplay = 0;
                  this.sub.unsubscribe();
                  this.isValid = !this.isValid;
                }
            }
        );
    }
  private getSeconds(ticks: number) {
      return this.pad(ticks % 60);
}

  private getMinutes(ticks: number) {
       return this.pad((Math.floor(ticks / 60)) % 60);
  }

  private getHours(ticks: number) {
      return this.pad(Math.floor((ticks / 60) / 60));
  }

  private pad(digit: any) {
      return digit <= 9 ? '0' + digit : digit;
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

   this.startTimer();

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
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
    };
    this.title = this.currentItem.title;
    this.description = this.currentItem.description;
  }
   saveItem(item){
     this.items.push(item);
     this.dataService.save(this.items);
     this.lengthItems = this.items.length;
   }
   challengeDone(): void{
     this.title = "Congrats to you for completing this challenge";
     this.description = "Come back tomorrow for a new Challenge";
   }
   viewChallenges() {
     console.log(this.items);
    this.navCtrl.push(ViewChallengesPage, {
      items:this.items
    });
  }
}
