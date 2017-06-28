import {Injectable} from '@angular/core';
import {SQLite} from 'ionic-native';
import {IUser} from '../models/user.model';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {ConfigDao} from '../dao/config.dao';

@Injectable()
export class AuthDao {

  public db: SQLite;
  private _user: IUser;

  constructor(public _http: Http, private _configDao: ConfigDao) {
    this.db = _configDao.getDb();
  }

  public get(): IUser {

    this.db.executeSql("SELECT * FROM authentication", []).then((data) => {
      let user = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          user.push({
            id: data.rows.item(i).id,
            username: data.rows.item(i).username,
            token: data.rows.item(i).token
          });
        }

        return user;
      }
    }, (error) => {

    });

    return null;
    /*
     return new Promise((resolve, reject) => {
     this.db.executeSql("SELECT * FROM authentication", []).then((data) => {
     let user = [];
     if (data.rows.length > 0) {
     for (let i = 0; i < data.rows.length; i++) {
     user.push({
     id: data.rows.item(i).id,
     username: data.rows.item(i).username,
     token: data.rows.item(i).token
     });
     }
     }
     resolve(user);
     }, (error) => {
     reject(error);
     });
     });*/

  }

  public create(_user: IUser): IUser {

    this.db.transaction(tr => { 
      tr.executeSql("INSERT INTO people (username, token) VALUES (?, ?)", [_user.usuLogin, "teste"]); })
        .then(d => { console.log('Data inserted ya hima'); }, err => { console.error(err); });

      return null;
  };

}
