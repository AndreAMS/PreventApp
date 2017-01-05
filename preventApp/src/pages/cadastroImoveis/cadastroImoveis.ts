import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    templateUrl: 'cadastroImoveis.html'
})
export class CadastroImoveisPage {
    
    private _navCtrl: NavController;
    
    constructor(private navCtrl: NavController) {        
        this._navCtrl = navCtrl;
    }
    
}
