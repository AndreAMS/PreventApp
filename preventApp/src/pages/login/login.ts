import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/user.model';

@Component({
    templateUrl: 'login.html',
    providers: [AuthService]
})
export class LoginPage {
      
    private _todo: any;

    constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public formBuilder: FormBuilder, 
        public authService: AuthService) {
        
        this._todo = this.formBuilder.group({
            user: ['', Validators.required],
            password: [''],
        });

    }

    logar() {
        
        var usuario: IUser = {
            id: 0,
            username: this._todo.value.user,
            password: this._todo.value.password,
            token: null
        };
        
        if (this.authService.authUser(usuario))
        {
            this.navCtrl.push(HomePage);
        }
        else
        {
            // Falha na Authenticacao, retornar erro na tela de login
        }        
        
    }
}
