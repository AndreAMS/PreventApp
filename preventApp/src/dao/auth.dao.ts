import { Component, Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import { IUser } from '../models/user.model';

@Injectable()
export class AuthDao {

    public db: SQLite;
    private _user: IUser;

    constructor() {

    }
    
    public getToken(user: IUser): string {        
        this._user = user;
        
        return this.UserToken();
    }
    
    private UserToken(): string
    {
        var retorno: string;
        
        retorno = this.CheckDatabase();
        
        if (retorno === null)
        {
            retorno = this.RequestServerUserToken();
        }        
        
        // Remover
        retorno = "9840810941809";
        
        return retorno;
    }
    
    private CheckDatabase(): string
    {
        // Procura o token no banco de dados
        return null;
    }
    
    private RequestServerUserToken(): string
    {
        // Não autenticou ainda na App, pedir pro Servidor
        return null;
    }   

}
