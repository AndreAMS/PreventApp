import {Component, Injectable} from '@angular/core';
import {SQLite} from 'ionic-native';

@Injectable()
export class ConfigDao {

  public db: SQLite;
  private isOpen: boolean;

  constructor() {

    if (!this.isOpen) {
        this.createDb();
        this.isOpen = true;
    }

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

  public getDb(): SQLite {
    return this.db;
  }

  // Verificação se tabelas existem
  private checkTables() {
    this.createAuthTable();
  }

  // Área das Tabelas
  private createAuthTable() {
    this.db.executeSql("CREATE TABLE IF NOT EXISTS authentication (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, token TEXT)", {}).then((data) => {
      console.log("TABLE CREATED: ", data);
    }, (error) => {
      console.error("Unable to execute sql", error);
    })
  }

}
