import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
import { IPlanejamento } from '../models/planejamento.model';

@Injectable()
export class PlanejamentoDAO {
    private _db;
    public _planejamentos;

    initDB() {
        window["PouchDB"] = PouchDB;
        this._db = new PouchDB('planejamento', { adapter: 'websql' });
        this._planejamentos = this.getAll();
    }

    add(planejamento) {
        return this._db.post(planejamento);
    }

    update(planejamento) {
        return this._db.put(planejamento);
    }

    delete(planejamento) {
        return this._db.remove(planejamento);
    }

    getAll() {

        if (!this._planejamentos) {
            return this._db.allDocs({ include_docs: true })
                .then(docs => {

                    this._planejamentos = docs.rows.map(row => {
                        row.doc.Date = new Date(row.doc.Date);
                        return row.doc;
                    });

                    this._db.changes({ live: true, since: 'now', include_docs: true })
                        .on('change', this.onDatabaseChange);

                    return this._planejamentos;
                });
        } else {
            return Promise.resolve(this._planejamentos);
        }
    }

    private onDatabaseChange = (change) => {
        var index = this.findIndex(this._planejamentos, change.id);
        var birthday = this._planejamentos[index];

        if (change.deleted) {
            if (birthday) {
                this._planejamentos.splice(index, 1); // delete
            }
        } else {
            change.doc.Date = new Date(change.doc.Date);
            if (birthday && birthday._id === change.id) {
                this._planejamentos[index] = change.doc; // update
            } else {
                this._planejamentos.splice(index, 0, change.doc) // insert
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