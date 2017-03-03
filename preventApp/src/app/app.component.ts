import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { ConfigDao } from '../dao/config.dao'
import { HomePage } from '../pages/home/home';

@Component({
    templateUrl: 'app.html',
    providers: [ConfigDao]
})
export class MyApp {
    rootPage: any = LoginPage;

    constructor(platform: Platform,
                private _configDao: ConfigDao) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
            
            _configDao.createDb();
            
        });
    }
}
