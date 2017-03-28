import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
import { IAtividade } from '../models/atividade.model';

@Injectable()
export class AtividadeDAO {
    private _db;
    private _atividades;

    initDB() {
        window["PouchDB"] = PouchDB;
        this._db = new PouchDB('atividade', { adapter: 'websql' });
    }

    add(atividade) {
        return this._db.post(atividade);
    }

    update(atividade) {
        return this._db.put(atividade);
    }

    delete(atividade) {
        return this._db.remove(atividade);
    }

    clean() {
        
        return this._db.allDocs({ include_docs: true })
            .then(docs => {

                this._atividades = docs.rows.map(row => {
                    return row.doc;
                });

                this._db.changes({ live: true, since: 'now', include_docs: true })
                    .on('change', this.onDatabaseChange);

                this._atividades.forEach(element => {
                    this.delete(element);
                });
            });
    }

    getById(id) {
        return this._db.allDocs({ include_docs: true })
            .then(docs => {
                this._atividades = docs.rows.map(row => {
                    row.doc.Date = new Date(row.doc.Date);

                    return row.doc;
                });

                this._db.changes({ live: true, since: 'now', include_docs: true })
                    .on('change', this.onDatabaseChange);

                return this._atividades.filter(item => item.Codigo === id);
            });

    }

    getAll() {

        if (!this._atividades) {
            return this._db.allDocs({ include_docs: true })
                .then(docs => {

                    this._atividades = docs.rows.map(row => {
                        row.doc.Date = new Date(row.doc.Date);
                        return row.doc;
                    });

                    this._db.changes({ live: true, since: 'now', include_docs: true })
                        .on('change', this.onDatabaseChange);

                    return this._atividades;
                });
        } else {
            return Promise.resolve(this._atividades);
        }
    }

    private onDatabaseChange = (change) => {
        var index = this.findIndex(this._atividades, change.id);
        var birthday = this._atividades[index];

        if (change.deleted) {
            if (birthday) {
                this._atividades.splice(index, 1); // delete
            }
        } else {
            change.doc.Date = new Date(change.doc.Date);
            if (birthday && birthday._id === change.id) {
                this._atividades[index] = change.doc; // update
            } else {
                this._atividades.splice(index, 0, change.doc) // insert
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