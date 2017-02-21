import { Component } from '@angular/core';

import { NavController, Alert, Platform, LoadingController } from 'ionic-angular';
import { CadastroImoveisPage } from '../cadastroImoveis/cadastroImoveis';
import { PesquisaLarvarialPage } from '../pesquisaLarvarial/pesquisaLarvarial';
import { TratamentoVetorialPage } from '../tratamentoVetorial/tratamentoVetorial';
import { SyncService } from '../../services/sync.service';

declare var navigator: any;
declare var Connection: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, private platform: Platform, private syncService: SyncService, private loadingController: LoadingController) {

    }

    ionViewDidLoad() {

        let loader = this.loadingController.create({
            content: 'Sincronizando as informações...',
            spinner: 'dots'
        });
        
        loader.present().then(() => {
            this.syncService.sincronizar().then(data => {
                loader.dismiss();
            });            
        });

    }

    goToCadastro() {
        this.navCtrl.push(CadastroImoveisPage);
    }

    goToPesquisaLarvarial() {
        this.navCtrl.push(PesquisaLarvarialPage);
    }

    goToTratamentoVetorial() {
        this.navCtrl.push(TratamentoVetorialPage);
    }

}
