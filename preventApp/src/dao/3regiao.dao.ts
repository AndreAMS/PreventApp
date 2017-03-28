import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import { IRegiao } from '../models/regiao.model';

@Injectable()
export class RegiaoDAO {
    private _db;
    private _regioes;

    initDB() {
        this._db = new SQLite();

        this._db.openDatabase({
            name: "data.db",
            location: "default"
        }).then(() => {
            console.log("Inicializou o database");
            
            this._db.executeSql("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)", {}).then((data) => {
                console.log("TABLE CREATED: ", data);
            }, (error) => {
                console.error("Unable to execute sql", error);
            })
        }, (error) => {
            console.error("Unable to open database", error);
        });
    }

    add(regiao) {
        return this._db.post(regiao);
    }

    update(regiao) {
        return this._db.put(regiao);
    }

    delete(regiao) {
        return this._db.remove(regiao);
    }

    clean() {
        return this._db.allDocs({ include_docs: true })
            .then(function (doc) {
                return this._db.remove(doc);
            }).then(function (result) {
                // handle result
            }).catch(function (err) {
                console.log(err);
            });
    }

    getAll() {
        //return Promise.resolve(null);
        /*if (!this._regioes) {
            return this._db.allDocs({ include_docs: true })
                .then(docs => {

                    this._regioes = docs.rows.map(row => {
                        row.doc.Date = new Date(row.doc.Date);
                        return row.doc;
                    });

                    this._db.changes({ live: true, since: 'now', include_docs: true })
                        .on('change', this.onDatabaseChange);

                    return this._regioes;
                });
        } else {
            return Promise.resolve(this._regioes);
        }*/
    }

    private onDatabaseChange = (change) => {
        var index = this.findIndex(this._regioes, change.id);
        var birthday = this._regioes[index];

        if (change.deleted) {
            if (birthday) {
                this._regioes.splice(index, 1); // delete
            }
        } else {
            change.doc.Date = new Date(change.doc.Date);
            if (birthday && birthday._id === change.id) {
                this._regioes[index] = change.doc; // update
            } else {
                this._regioes.splice(index, 0, change.doc) // insert
            }
        }
    }

    private findIndex(array, id) {
        var low = 0, high = array.length, mid;
        while (low < high) {
            mid = (low + high) >>> 1;
            array[mid]._id < id ? low = mid + 1 : high = mid
        }
        return low;
    }
}