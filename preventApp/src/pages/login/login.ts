import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';
import { SyncService } from '../../services/sync.service';
import { AuthDao } from '../../dao/auth.dao';
import { IUser } from '../../models/user.model'
import { PlanejamentoDAO } from '../../dao/planejamento.dao';

@Component({
    templateUrl: 'login.html',
    providers: [SyncService, AuthService, AuthDao]
})
export class LoginPage {
      
    private _user: any;
    loading: any;
    planejamento: any;

    constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public formBuilder: FormBuilder, 
        public authService: AuthService,
        public syncService: SyncService, 
        private planejamentoDAO: PlanejamentoDAO) {

        this.loading = false;
        
        this._user = this.formBuilder.group({
            user: ['', Validators.required],
            password: [''],
        });

    }

    logar() {

        this.loading = true;
        
        var usuario: IUser = {
            id: 0,
            usuLogin: this._user.value.user.toLowerCase(),
            usuSenha: this._user.value.password,
            token: null
        };

        console.log(usuario);

        var token = this.authService.authUser(usuario);

        if (token !== null)
        {
            this.loading = false;

                this.navCtrl.push(HomePage, {
                    token: token
                });

            
            
        }
        else
        {
            // Falha na Authenticacao, retornar erro na tela de login
            //alert("Falha na Autenticacao");
            this.loading = false;
        }   
        
    }
}
