import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
import { IBairro } from '../models/bairro.model';

@Injectable()
export class BairroDAO {
    private _db;
    public _bairros;

    initDB() {
        window["PouchDB"] = PouchDB;
        this._db = new PouchDB('bairro', { adapter: 'websql' });
        this._bairros = this.getAll();
    }

    add(bairro) {
        return this._db.post(bairro);
    }

    update(bairro) {
        return this._db.put(bairro);
    }

    delete(bairro) {
        return this._db.remove(bairro);
    }

    clean() {
        return this._db.allDocs({ include_docs: true })
            .then(docs => {

                this._bairros = docs.rows.map(row => {
                    return row.doc;
                });

                this._db.changes({ live: true, since: 'now', include_docs: true })
                    .on('change', this.onDatabaseChange);

                this._bairros.forEach(element => {
                    this.delete(element);
                });
            });
    }

    getByRegion(regionId) {
        
        return this._db.allDocs({ include_docs: true })
            .then(docs => {
                var _bairroSelected: any;

                this._bairros = docs.rows.map(row => {
                    row.doc.Date = new Date(row.doc.Date);
                    
                    return row.doc;
                });

                this._db.changes({ live: true, since: 'now', include_docs: true })
                    .on('change', this.onDatabaseChange);

                return this._bairros.filter(item => item.Regiao === regionId);
            });

    }

    getAll() {

        if (!this._bairros) {
            return this._db.allDocs({ include_docs: true })
                .then(docs => {

                    this._bairros = docs.rows.map(row => {
                        row.doc.Date = new Date(row.doc.Date);
                        return row.doc;
                    });

                    this._db.changes({ live: true, since: 'now', include_docs: true })
                        .on('change', this.onDatabaseChange);

                    return this._bairros;
                });
        } else {
            return Promise.resolve(this._bairros);
        }
    }

    private onDatabaseChange = (change) => {
        var index = this.findIndex(this._bairros, change.id);
        var birthday = this._bairros[index];

        if (change.deleted) {
            if (birthday) {
                this._bairros.splice(index, 1); // delete
            }
        } else {
            change.doc.Date = new Date(change.doc.Date);
            if (birthday && birthday._id === change.id) {
                this._bairros[index] = change.doc; // update
            } else {
                this._bairros.splice(index, 0, change.doc) // insert
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