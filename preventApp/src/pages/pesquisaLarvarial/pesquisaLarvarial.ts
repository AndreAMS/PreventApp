import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    templateUrl: 'pesquisaLarvarial.html'
})
export class PesquisaLarvarialPage {
    
    private _navCtrl: NavController;
    
    constructor(private navCtrl: NavController) {        
        this._navCtrl = navCtrl;
    }
    
}
