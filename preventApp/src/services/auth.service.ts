import { Component, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IUser } from '../models/user.model';

@Injectable()
export class AuthService {
    
    constructor(private _http: Http) {

    }
    
    public authUser(user: IUser): Boolean {

        // Buscar na DAO as informações o token da tabela auth, se não existir buscar no server.
        //var token = this._authDao.getToken(user);
        var token = "9824091840";
        
        if (token === null)
            return false;
        else
            return true;
    }
    
}
