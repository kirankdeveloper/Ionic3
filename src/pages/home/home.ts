import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  countries: any[];
  errorMessage: string;
  countDown : any;
  message:String;
  count$ : any;
  countCompleted :boolean;
  constructor(public navCtrl: NavController, public rest: RestProvider) {
    //async task example 
    this.countDown = 5;
    this.message = "async example Completed"
    this.countCompleted = false;
    this.count$ = Observable
                    .interval(1000)
                    .map(i => this.countDown - i)
                    .takeWhile(i => i > 0)
                    .finally(() => this.countCompleted = true);
  }

  ionViewDidLoad() {
    this.getCountries();
  }
//getting list of countries 
  getCountries() {
    this.rest.getCountries()
       .subscribe(
      countries => {
        this.countries = countries;

      },

         error =>  this.errorMessage = <any>error);
  }

}
