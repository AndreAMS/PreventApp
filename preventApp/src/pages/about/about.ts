import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';

@Component({
    templateUrl: 'login.html',
    providers: [AuthService]
})
export class AboutPage {
    
    private _authService: AuthService;
    private _navCtrl: NavController;
    private _formBuilder: FormBuilder;
    private _todo: any;

    constructor(private navCtrl: NavController, 
        private navParams: NavParams, 
        private formBuilder: FormBuilder, 
        private authService: AuthService) {
        
        this._navCtrl = navCtrl;
        this._formBuilder = formBuilder;
        this._authService = authService;

        this._todo = this.formBuilder.group({
            user: ['', Validators.required],
            password: [''],
        });

    }

}
