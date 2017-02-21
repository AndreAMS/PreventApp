import {Component, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {IUser} from '../models/user.model';
import {AuthDao} from '../dao/auth.dao';
import {UserDAO} from '../dao/user.dao';
import {Observable} from 'rxjs/Observable';

@Component({
  providers: [AuthDao]
})
export class AuthService {

  private _user: IUser;

  constructor(private _http: Http, private _authDao: AuthDao, private _userDAO: UserDAO) {
      this._userDAO.initDB();
  }

  public authUser(user: IUser): Boolean {

    this._user = user;

    var token = this.requestUserToken();

    if (token === null)
      return false;
    else
      return true;
  }

  private requestUserToken(): string {
    
    var result = this.CheckDatabase();

    return "token";/*

    if (result === null){

      this._authDao.create(this._user);

       var teste = this._authDao.get();

      return "teste";
    }
    
    if (this._user.token === null) {
      var user = this.RequestServerUser();

      this._authDao.create(user);

      return "user";
    }    

    return this._user.token;*/
  }

  private CheckDatabase(): IUser {
    return this._userDAO.get(this._user.username, this._user.password);
  }

  private RequestServerUser(): IUser {

    let user: IUser;

    this._http.get('mock/userAuth.json')
      .map((response: Response) => user = <IUser>JSON.parse(response.json()));
    ;

    return user;
  }


}
