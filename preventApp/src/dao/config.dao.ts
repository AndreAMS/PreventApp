import { Component, Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';

@Injectable()
export class ConfigDao {

    public db: SQLite;

    constructor() {

    }
    
    // Check no banco, criar se necessário
    public createDb(): void {

        this.db = new SQLite();

        this.db.openDatabase({
            name: "data.db",
            location: "default"
        }).then(() => {
            this.checkTables();
        }, (error) => {
            console.error("Unable to open database", error);
        });

    }

    // Verificação se tabelas existem
    private checkTables() {
        this.createPeopleTable();
    }
    
    // Área das Tabelas
    private createPeopleTable() {
        this.db.executeSql("CREATE TABLE IF NOT EXISTS authentication (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, token TEXT)", {}).then((data) => {
            console.log("TABLE CREATED: ", data);
        }, (error) => {
            console.error("Unable to execute sql", error);
        })
    }

}
