import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
import { IVistoria } from '../models/vistoria.model';

@Injectable()
export class VistoriaDAO {
    private _db;
    public _vistoria;

    initDB() {
        window["PouchDB"] = PouchDB;
        this._db = new PouchDB('vistoria', { adapter: 'websql' });
        this._vistoria = this.getAll();
    }

    add(vistoria) {
        return this._db.post(vistoria);
    }

    update(vistoria) {
        return this._db.put(vistoria);
    }

    delete(vistoria) {
        return this._db.remove(vistoria);
    }

    clean() {
        return this._db.allDocs({ include_docs: true })
            .then(docs => {

                this._vistoria = docs.rows.map(row => {
                    return row.doc;
                });

                this._db.changes({ live: true, since: 'now', include_docs: true })
                    .on('change', this.onDatabaseChange);

                this._vistoria.forEach(element => {
                    this.delete(element);
                });
            });
    }

    getById(id) {
        return this._db.allDocs({ include_docs: true })
            .then(docs => {
                this._vistoria = docs.rows.map(row => {
                    row.doc.Date = new Date(row.doc.Date);
                    
                    return row.doc;
                });

                this._db.changes({ live: true, since: 'now', include_docs: true })
                    .on('change', this.onDatabaseChange);

                return this._vistoria.filter(item => item.Codigo === id);
            });

    }

    getByImovel(imovelId) {
        return this._db.allDocs({ include_docs: true })
            .then(docs => {
                this._vistoria = docs.rows.map(row => {
                    row.doc.Date = new Date(row.doc.Date);
                    
                    return row.doc;
                });

                this._db.changes({ live: true, since: 'now', include_docs: true })
                    .on('change', this.onDatabaseChange);

                return this._vistoria;
            });

    }

    getAll() {

        if (!this._vistoria) {
            return this._db.allDocs({ include_docs: true })
                .then(docs => {

                    this._vistoria = docs.rows.map(row => {
                        row.doc.Date = new Date(row.doc.Date);
                        return row.doc;
                    });

                    this._db.changes({ live: true, since: 'now', include_docs: true })
                        .on('change', this.onDatabaseChange);

                    return this._vistoria;
                });
        } else {
            return Promise.resolve(this._vistoria);
        }
    }

    private onDatabaseChange = (change) => {
        var index = this.findIndex(this._vistoria, change.id);
        var birthday = this._vistoria[index];

        if (change.deleted) {
            if (birthday) {
                this._vistoria.splice(index, 1); // delete
            }
        } else {
            change.doc.Date = new Date(change.doc.Date);
            if (birthday && birthday._id === change.id) {
                this._vistoria[index] = change.doc; // update
            } else {
                this._vistoria.splice(index, 0, change.doc) // insert
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