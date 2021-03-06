import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddChallengePage } from '../pages/add-challenge/add-challenge';
import { ViewChallengesPage } from '../pages/view-challenges/view-challenges';
import { ChallengeServiceProvider } from '../providers/challenge-service/challenge.service';
import { DataProvider } from '../providers/data/data';
import { Shake } from '@ionic-native/shake';
import { IntroPage } from '../pages/intro/intro';
import { PopoverPage } from '../pages/popover/popover';
import { ParallaxHeader } from '../directives/parallax-header/parallax-header';
import { ProfilePage } from '../pages/profile/profile';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddChallengePage,
    ViewChallengesPage,
    IntroPage,
    PopoverPage,
    ParallaxHeader,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddChallengePage,
    ViewChallengesPage,
    IntroPage,
    PopoverPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ChallengeServiceProvider,
    DataProvider,
    Shake
  ]
})
export class AppModule {}
