import {Component, Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import {IUser} from '../models/user.model';
import {AuthDao} from '../dao/auth.dao';
import {UserDAO} from '../dao/user.dao';
import {Observable} from 'rxjs/Observable';
import { HomePage } from '../pages/home/home';

@Component({
  providers: [AuthDao]
})
export class AuthService {

  private _user: IUser;

  constructor(private _http: Http, public navCtrl: NavController,  private _authDao: AuthDao, private _userDAO: UserDAO) {
      this._userDAO.initDB();
  }

  public authUser(user: IUser): String {

    this._user = user;

    var token = this.requestUserToken();

    return token;
  }

  private requestUserToken(): String {
    
    var result = this.CheckDatabase();

    console.log(result);
    
    if (result === null)
    {
        return this.RequestServerUser();        
    }
    else
    {
      return result;
    }

    
  }

  private CheckDatabase(): String {
    var usuarios = this._userDAO._users.filter(r=> r.usuLogin == this._user.usuLogin && r.usuSenha == this._user.usuSenha);

    console.log(usuarios);

    if (usuarios.length > 0){
        return usuarios[0].token;
    }
    else
    {
      return null;
    }
  }

  private RequestServerUser(): String {

    let user: IUser;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    var data = "{ \"usuLogin\": \"" + this._user.usuLogin + "\", \"usuSenha\":\"" + this._user.usuSenha + "\" }";

    this._http.post('http://52.45.198.8:8080/dengueprevent/api/gerarToken', data, {headers: headers})
      .subscribe(data => {
              var d = data.json(); 

              console.log("aqui");   
              console.log(d);

              if (d.hasOwnProperty('token')){

                if (d["token"] !== null)
                {
                   console.log(d["token"]);

                    var usuario: IUser = {
                        id: 0,
                        usuLogin: this._user.usuLogin,
                        usuSenha: this._user.usuSenha,
                        token: d["token"]
                    };

                    this._userDAO.add(usuario);

                    if (d["token"] !== null)
                    {
                      this.navCtrl.push(HomePage, {
                          token: d["token"]
                      });
                    }

                    return d["token"];
                }
                
              } 

              if (d.hasOwnProperty('erro')){
                alert(d["erro"]);
              }

              return false;
              
          }, error => {
              alert("Não foi possível realizar o login")
              console.log(error.json());
          });
    ;
    return null;
  }


}
