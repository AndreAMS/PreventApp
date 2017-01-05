import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    templateUrl: 'tratamentoVetorial.html'
})
export class TratamentoVetorialPage {
    
    private _navCtrl: NavController;
    
    constructor(private navCtrl: NavController) {        
        this._navCtrl = navCtrl;
    }
    
}
