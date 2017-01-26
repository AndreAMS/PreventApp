import {Component, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {IUser} from '../models/user.model';
import {AuthDao} from '../dao/auth.dao';
import {Observable} from 'rxjs/Observable';

@Component({
  providers: [AuthDao]
})
export class AuthService {

  private _user: IUser;

  constructor(private _http: Http, private _authDao: AuthDao) {

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
      
    return "user";

    /*this.CheckDatabase();

    if (this._user.token === null) {
      var user = this.RequestServerUser();

      this._authDao.create(user);

      return "user";
    }

    return this._user.token;*/
  }

  private CheckDatabase(): IUser {
    return this._authDao.get();
  }

  private RequestServerUser(): IUser {

    let user: IUser;

    this._http.get('mock/userAuth.json')
      .map((response: Response) => user = <IUser>JSON.parse(response.json()));
    ;

    return user;
  }


}
