import { TratamentoVetorialPage } from '../tratamentoVetorial/tratamentoVetorial';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ImovelDAO } from '../../dao/imoveis.dao';
import { VistoriaDAO } from '../../dao/vistoria.dao';
import { IVistoria } from '../../models/vistoria.model';
import { UUID } from 'angular2-uuid';

@Component({
    templateUrl: 'vistoria.html'
})
export class VistoriaPage {

    private _imovelId: number;
    private _bairroId: number;
    private _atividadeId: number;
    private _vistoriaId: string;
    imoveis: any;
    vistoria: any;

    private _navCtrl: NavController;

    constructor(private navCtrl: NavController, private navParams: NavParams, private loadingController: LoadingController, private imovelDAO: ImovelDAO, private vistoriaDAO: VistoriaDAO) {
        this._navCtrl = navCtrl;
        this._imovelId = this.navParams.get('imovelId');
        this._bairroId = this.navParams.get('bairroId');
        this._atividadeId = this.navParams.get('atividadeId');
        this._vistoriaId = this.navParams.get('vistoriaId');
        this.vistoria = new IVistoria();

        if (this._vistoriaId != "") {
            this.vistoriaDAO.getById(this._vistoriaId).then(data => {
                this.vistoria = data[0];

                console.log(data[0]);
            });
        }
        else
        {
            this.vistoria.Pacotes = 0;
            this.vistoria.Pneus = 0;
            this.vistoria.Piscina = 0;
            this.vistoria.Vasos = 0;
            this.vistoria.Outros = 0;
            this.vistoria.Satisfacao = 10;
        }        
    }

    ionViewDidLoad() {

        let loader = this.loadingController.create({
            content: 'Sincronizando as informações...',
            spinner: 'dots'
        });

        loader.present().then(() => {

            this.imovelDAO.getById(this._imovelId).then(data => {
                this.imoveis = data;
                loader.dismiss();
            });

        });
    }

    realizar() {
        if (this._vistoriaId != "") {
            this.vistoria.Codigo = this._vistoriaId;
            this.vistoria.Date = new Date();
            this.vistoria.DataHora = new Date().toLocaleDateString();
            this.vistoria.Status = "Realizada";
            this.vistoria.ImovelId = this._imovelId;
            this.vistoriaDAO.update(this.vistoria);
        }
        else {
            this.vistoria.Codigo = UUID.UUID();
            this.vistoria.Date = new Date();
            this.vistoria.DataHora = new Date().toLocaleDateString();
            this.vistoria.Status = "Realizada";
            this.vistoria.ImovelId = this._imovelId;
            this.vistoriaDAO.add(this.vistoria);
        }

        this.navCtrl.push(TratamentoVetorialPage, {
            bairroId: this._bairroId,
            atividadeId: this._atividadeId
        });
    }

    naoAtendimento() {
        if (this._vistoriaId != "") {
            this.vistoria.Codigo = this._vistoriaId;
            this.vistoria.ImovelId = this._imovelId;
            this.vistoria.Status = "Não Atendimento";
            this.vistoria.DataHora = new Date().toLocaleDateString();
            this.vistoria.Date = new Date();
            this.vistoria.Nova = "Sim";
            this.vistoria.Pacotes = 0;
            this.vistoria.Pneus = 0;
            this.vistoria.Piscina = 0;
            this.vistoria.Vasos = 0;
            this.vistoria.Outros = 0;
            this.vistoria.Satisfacao = 0;

            this.vistoriaDAO.update(this.vistoria);
        }
        else
        {
            var vistoria = new IVistoria();
            vistoria.Codigo = UUID.UUID();
            vistoria.ImovelId = this._imovelId;
            vistoria.DataHora = new Date().toLocaleDateString();
            vistoria.Status = "Não Atendimento";
            vistoria.Nova = "Sim";
            vistoria.Pacotes = 0;
            vistoria.Pneus = 0;
            vistoria.Piscina = 0;
            vistoria.Vasos = 0;
            vistoria.Outros = 0;
            vistoria.Satisfacao = 10;

            this.vistoriaDAO.add(vistoria);
        }
        

        this.navCtrl.push(TratamentoVetorialPage, {
            bairroId: this._bairroId,
            atividadeId: this._atividadeId
        });
    }

    naoEncontrado() {
        if (this._vistoriaId != "") {
            this.vistoria.Codigo = this._vistoriaId;
            this.vistoria.ImovelId = this._imovelId;
            this.vistoria.Date = new Date();
            this.vistoria.DataHora = new Date().toLocaleDateString();
            this.vistoria.Status = "Não Encontrado";
            this.vistoria.Nova = "Sim";
            this.vistoria.Pacotes = 0;
            this.vistoria.Pneus = 0;
            this.vistoria.Piscina = 0;
            this.vistoria.Vasos = 0;
            this.vistoria.Outros = 0;
            this.vistoria.Satisfacao = 10;


            this.vistoriaDAO.update(this.vistoria);
        }
        else
        {
            var vistoria = new IVistoria();
            vistoria.Codigo = UUID.UUID();
            vistoria.ImovelId = this._imovelId;
            vistoria.DataHora = new Date().toLocaleDateString();
            vistoria.Status = "Não Encontrado";
            vistoria.Nova = "Sim";
            vistoria.Pacotes = 0;
            vistoria.Pneus = 0;
            vistoria.Piscina = 0;
            vistoria.Vasos = 0;
            vistoria.Outros = 0;
            vistoria.Satisfacao = 10;

            this.vistoriaDAO.add(vistoria);
        }

        this.navCtrl.push(TratamentoVetorialPage, {
            bairroId: this._bairroId,
            atividadeId: this._atividadeId
        });
    }

    aumenta(item){
        if (item == "Pneus")
        {
            this.vistoria.Pneus = this.vistoria.Pneus + 1;
        }
        if (item == "Piscina")
        {
            this.vistoria.Piscina = this.vistoria.Piscina + 1;
        }
        if (item == "Vasos")
        {
            this.vistoria.Vasos = this.vistoria.Vasos + 1;
        }
        if (item == "Outros")
        {
            this.vistoria.Outros = this.vistoria.Outros + 1;
        }
    }

    diminuir(item) {
        if (item == "Pneus")
        {
            if (this.vistoria.Pneus - 1 >=0)
                this.vistoria.Pneus = this.vistoria.Pneus - 1;
        }
        if (item == "Piscina")
        {
            if (this.vistoria.Piscina - 1 >=0)
                this.vistoria.Piscina = this.vistoria.Piscina - 1;
        }
        if (item == "Vasos")
        {
            if (this.vistoria.Vasos - 1 >=0)
                this.vistoria.Vasos = this.vistoria.Vasos - 1;
        }
        if (item == "Outros")
        {
            if (this.vistoria.Outros - 1 >=0)
                this.vistoria.Outros = this.vistoria.Outros - 1;
        }
    }
}
