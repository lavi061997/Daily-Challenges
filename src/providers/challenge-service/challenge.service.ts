// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { Challenge } from '../../models/challenge.interface';
import { CHALLENGE_LIST } from '../../mocks/challenge.mocks';

/*
  Generated class for the ChallengeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChallengeServiceProvider {

  constructor() {
    console.log('Hello ChallengeServiceProvider Provider');
  }

  mockGetChallenge(position: number): Observable<Challenge>{
    return Observable.of(CHALLENGE_LIST.filter(challenge => challenge[position])[0]);
  }
}
