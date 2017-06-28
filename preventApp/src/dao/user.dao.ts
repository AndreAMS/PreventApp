import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
import {IUser} from '../models/user.model';

@Injectable()
export class UserDAO {
    private _db;
    public _users;
    
    initDB() {
        window["PouchDB"] = PouchDB;  
        this._db = new PouchDB('user', { adapter: 'websql' });
        this._users = this.getAll();
    }

    add(user) {
        return this._db.post(user);
    }

    update(user) {
        return this._db.put(user);
    }

    delete(user) {
        return this._db.remove(user);
    }

    get(user, password) : Array<IUser> {
        
        return this._db.allDocs({ include_docs: true })
            .then(docs => {
                var _users: any;

                _users = docs.rows.map(row => {
                    row.doc.Date = new Date(row.doc.Date);
                    
                    return row.doc;
                });

                this._db.changes({ live: true, since: 'now', include_docs: true })
                    .on('change', this.onDatabaseChange);

                return Array<IUser>(_users.filter(item => item.usuLogin === user));
            });        
    }

    getAll() {

        if (!this._users) {
            return this._db.allDocs({ include_docs: true })
                .then(docs => {

                    this._users = docs.rows.map(row => {
                        row.doc.Date = new Date(row.doc.Date);
                        return row.doc;
                    });

                    this._db.changes({ live: true, since: 'now', include_docs: true })
                        .on('change', this.onDatabaseChange);

                    return this._users;
                });
        } else {
            return Promise.resolve(this._users);
        }
    }

    private onDatabaseChange = (change) => {
        var index = this.findIndex(this._users, change.id);
        var birthday = this._users[index];

        if (change.deleted) {
            if (birthday) {
                this._users.splice(index, 1); // delete
            }
        } else {
            change.doc.Date = new Date(change.doc.Date);
            if (birthday && birthday._id === change.id) {
                this._users[index] = change.doc; // update
            } else {
                this._users.splice(index, 0, change.doc) // insert
            }
        }
    }

    private findIndex(array, id) {

        if (typeof array !== 'undefined')
        {
            var low = 0, high = array.length, mid;
            while (low < high) {
                mid = (low + high) >>> 1;
                array[mid]._id < id ? low = mid + 1 : high = mid
            }
            return low;
        }
    }
}