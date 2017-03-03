import { Component } from '@angular/core';

import { NavController, Alert, Platform, LoadingController } from 'ionic-angular';
import { CadastroImoveisPage } from '../cadastroImoveis/cadastroImoveis';
import { PesquisaLarvarialPage } from '../pesquisaLarvarial/pesquisaLarvarial';
import { TratamentoVetorialPage } from '../tratamentoVetorial/tratamentoVetorial';
import { SyncService } from '../../services/sync.service';
import { AtividadeDAO } from '../../dao/atividade.dao';

declare var navigator: any;
declare var Connection: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    atividades: any;

    constructor(public navCtrl: NavController, private platform: Platform, private syncService: SyncService, private loadingController: LoadingController, private atividadeDAO: AtividadeDAO) {

    }

    ionViewDidLoad() {

        let loader = this.loadingController.create({
            content: 'Sincronizando as informações...',
            spinner: 'dots'
        });

        loader.present().then(() => {
            this.syncService.sincronizar().then(data => {
                this.atividadeDAO.getAll().then(data => {
                    this.atividades = data;
                    loader.dismiss();
                });
            });
        });

    }

    goToCadastro() {
        this.navCtrl.push(CadastroImoveisPage);
    }

    goToPesquisaLarvarial() {
        this.navCtrl.push(PesquisaLarvarialPage);
    }

    goToTratamentoVetorial(codigoId, bairroId) {
        this.navCtrl.push(TratamentoVetorialPage, {
            bairroId: bairroId,
            atividadeId: codigoId
        });
    }

}
