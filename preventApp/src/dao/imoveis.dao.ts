import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
import { IImovel } from '../models/imovel.model';

@Injectable()
export class ImovelDAO {
    private _db;
    private _imoveis;

    initDB() {
        window["PouchDB"] = PouchDB;
        this._db = new PouchDB('imoveis', { adapter: 'websql' });
    }

    add(imovel) {
        return this._db.post(imovel);
    }

    update(imovel) {
        return this._db.put(imovel);
    }

    delete(imovel) {
        return this._db.remove(imovel);
    }

    clean() {
        return this._db.allDocs({ include_docs: true })
            .then(docs => {

                this._imoveis = docs.rows.map(row => {
                    return row.doc;
                });

                this._db.changes({ live: true, since: 'now', include_docs: true })
                    .on('change', this.onDatabaseChange);

                this._imoveis.forEach(element => {
                    this.delete(element);
                });
            });
    }

    getById(codigo) {
        
        return this._db.allDocs({ include_docs: true })
            .then(docs => {
                this._imoveis = docs.rows.map(row => {
                    row.doc.Date = new Date(row.doc.Date);
                    
                    return row.doc;
                });

                this._db.changes({ live: true, since: 'now', include_docs: true })
                    .on('change', this.onDatabaseChange);

                return this._imoveis.filter(item => item.Codigo === codigo);
            });

    }

    getByBairro(bairroId) {
        
        return this._db.allDocs({ include_docs: true })
            .then(docs => {
                this._imoveis = docs.rows.map(row => {
                    row.doc.Date = new Date(row.doc.Date);
                    
                    return row.doc;
                });

                this._db.changes({ live: true, since: 'now', include_docs: true })
                    .on('change', this.onDatabaseChange);

                return this._imoveis.filter(item => item.BairroId === bairroId);
            });

    }

    getAll() {

        if (!this._imoveis) {
            return this._db.allDocs({ include_docs: true })
                .then(docs => {

                    this._imoveis = docs.rows.map(row => {
                        row.doc.Date = new Date(row.doc.Date);
                        return row.doc;
                    });

                    this._db.changes({ live: true, since: 'now', include_docs: true })
                        .on('change', this.onDatabaseChange);

                    return this._imoveis;
                });
        } else {
            return Promise.resolve(this._imoveis);
        }
    }

    private onDatabaseChange = (change) => {
        var index = this.findIndex(this._imoveis, change.id);
        var birthday = this._imoveis[index];

        if (change.deleted) {
            if (birthday) {
                this._imoveis.splice(index, 1); // delete
            }
        } else {
            change.doc.Date = new Date(change.doc.Date);
            if (birthday && birthday._id === change.id) {
                this._imoveis[index] = change.doc; // update
            } else {
                this._imoveis.splice(index, 0, change.doc) // insert
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