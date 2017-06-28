import { PesquisaLarvarialPage } from '../pesquisaLarvarial/pesquisaLarvarial';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ImovelDAO } from '../../dao/imoveis.dao';
import { VistoriaDAO } from '../../dao/vistoria.dao';
import { IVistoria } from '../../models/vistoria.model';
import { UUID } from 'angular2-uuid';

@Component({
    templateUrl: 'vistoriaPesquisa.html'
})
export class VistoriaPesquisaPage {

    private _imovelId: string;
    private _tipat_codigo: number;
    vistoria: any;
    imovel: any;    

    private _navCtrl: NavController;

    constructor(private navCtrl: NavController, private navParams: NavParams, private loadingController: LoadingController, private imovelDAO: ImovelDAO, private vistoriaDAO: VistoriaDAO) {
        this._navCtrl = navCtrl;
        this._navCtrl = navCtrl;
        this._imovelId = this.navParams.get('imovelId');
        this.vistoria = new IVistoria();
        this._tipat_codigo = 2;
    }

    ionViewDidLoad() {

        let loader = this.loadingController.create({
            content: 'Sincronizando as informações...',
            spinner: 'dots'
        });

        loader.present().then(() => {
            
            var vistoria = this.vistoriaDAO._vistoria.filter(r=> r.imov_id === this._imovelId && r.tipat_codigo === this._tipat_codigo);

            if (vistoria.length > 0)
            {
                this.vistoria = vistoria[0];
            }
            else
            {
                this.vistoria.vis_pneus = 0;
                this.vistoria.vis_piscina = 0;
                this.vistoria.vis_vasos = 0;
                this.vistoria.vis_caixadagua = 0;
                this.vistoria.vis_aegypt = 0;
                this.vistoria.vis_alb = 0;
                this.vistoria.vis_tubos = 0;
                this.vistoria.vis_amostras = 0;
            }

            console.log(typeof this.vistoria._id);

            loader.dismiss();

        });
    }

    diminuir(tipo) {
        if (tipo == 'vis_tubos')
        {
            if (this.vistoria.vis_tubos - 1 > -1)
            {
                this.vistoria.vis_tubos = this.vistoria.vis_tubos - 1;
            }
        }

        if (tipo == 'vis_alb')
        {
            if (this.vistoria.vis_alb - 1 > -1)
            {
                this.vistoria.vis_alb = this.vistoria.vis_alb - 1;
            }
        }

        if (tipo == 'vis_aegypt')
        {
            if (this.vistoria.vis_aegypt - 1 > -1)
            {
                this.vistoria.vis_aegypt = this.vistoria.vis_aegypt - 1;
            }
        }

        if (tipo == 'vis_pneus')
        {
            if (this.vistoria.vis_pneus - 1 > -1)
            {
                this.vistoria.vis_pneus = this.vistoria.vis_pneus - 1;
            }
        }

        if (tipo == 'vis_piscina')
        {
            if (this.vistoria.vis_piscina - 1 > -1)
            {
                this.vistoria.vis_piscina = this.vistoria.vis_piscina - 1;
            }
        }

        if (tipo == 'vis_vasos')
        {
            if (this.vistoria.vis_vasos - 1 > -1)
            {
                this.vistoria.vis_vasos = this.vistoria.vis_vasos - 1;
            }
        }

        if (tipo == 'vis_caixadagua')
        {
            if (this.vistoria.vis_caixadagua - 1 > -1)
            {
                this.vistoria.vis_caixadagua = this.vistoria.vis_caixadagua - 1;
            }
        }

        if (tipo == 'vis_caixadagua')
        {
            if (this.vistoria.vis_caixadagua - 1 > -1)
            {
                this.vistoria.vis_caixadagua = this.vistoria.vis_caixadagua - 1;
            }
        }

        if (tipo == 'vis_frascos')
        {
            if (this.vistoria.vis_frascos - 1 > -1)
            {
                this.vistoria.vis_frascos = this.vistoria.vis_frascos - 1;
            }
        }

        if (tipo == 'vis_amostras')
        {
            if (this.vistoria.vis_amostras - 1 > -1)
            {
                this.vistoria.vis_amostras = this.vistoria.vis_amostras - 1;
            }
        }
    }

    aumenta(tipo) {
        if (tipo == 'vis_amostras')
        {
            this.vistoria.vis_amostras = this.vistoria.vis_amostras + 1;
        }

        if (tipo == 'vis_tubos')
        {
            this.vistoria.vis_tubos = this.vistoria.vis_tubos + 1;
        }

        if (tipo == 'vis_alb')
        {
            this.vistoria.vis_alb = this.vistoria.vis_alb + 1;
        }

        if (tipo == 'vis_aegypt')
        {
            this.vistoria.vis_aegypt = this.vistoria.vis_aegypt + 1;
        }

        if (tipo == 'vis_pneus')
        {
            this.vistoria.vis_pneus = this.vistoria.vis_pneus + 1;
        }

        if (tipo == 'vis_piscina')
        {
            this.vistoria.vis_piscina = this.vistoria.vis_piscina + 1;
        }

        if (tipo == 'vis_vasos')
        {
            this.vistoria.vis_vasos = this.vistoria.vis_vasos + 1;
        }

        if (tipo == 'vis_caixadagua')
        {
            this.vistoria.vis_caixadagua = this.vistoria.vis_caixadagua + 1;
        }

        if (tipo == 'vis_frascos')
        {
            this.vistoria.vis_frascos = this.vistoria.vis_frascos + 1;
        }

    }

    cadastrar() { 
        var i = <IVistoria>this.vistoria;
        i.vis_status = "realizada";
        i.imov_id = this._imovelId;
        this.vistoria.Date = new Date();
        this.vistoria.tipat_codigo = this._tipat_codigo;

        if (typeof this.vistoria._id === 'undefined') {
            this.vistoriaDAO.add(this.vistoria);
        } else
        {
            this.vistoriaDAO.update(this.vistoria);
        }

        this.navCtrl.push(PesquisaLarvarialPage, {
            bairroId: 8
        });
    }

    naoAtendimento() {
        
        if (typeof this.vistoria._id === 'undefined') {
            this.vistoria = new IVistoria();
            this.vistoria.vis_status = "naorealizada";
            this.vistoria.imov_id = this._imovelId;
            this.vistoria.vis_pneus = 0;
            this.vistoria.vis_piscina = 0;
            this.vistoria.vis_vasos = 0;
            this.vistoria.vis_caixadagua = 0;
            this.vistoria.vis_amostras = 0;
            this.vistoria.vis_frascos = 0;
            this.vistoria.vis_aegypt = 0;
            this.vistoria.vis_alb = 0;
            this.vistoria.vis_tubos = 0;
            this.vistoria.vis_amostras = 0;
            this.vistoria.Date = new Date();
            this.vistoria.tipat_codigo = this._tipat_codigo;

            this.vistoriaDAO.add(this.vistoria);
        } else
        {
            this.vistoria.vis_status = "naorealizada";
            this.vistoria.imov_id = this._imovelId;
            this.vistoria.Date = new Date();
            this.vistoria.vis_pneus = 0;
            this.vistoria.vis_piscina = 0;
            this.vistoria.vis_vasos = 0;
            this.vistoria.vis_caixadagua = 0;
            this.vistoria.vis_amostras = 0;
            this.vistoria.vis_frascos = 0;
            this.vistoria.vis_aegypt = 0;
            this.vistoria.vis_alb = 0;
            this.vistoria.vis_tubos = 0;
            this.vistoria.vis_amostras = 0;
            this.vistoria.tipat_codigo = this._tipat_codigo;
            
            this.vistoriaDAO.update(this.vistoria);
        }
        
        this.navCtrl.push(PesquisaLarvarialPage, {
            bairroId: 8
        });
    }


    /*realizar() {
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
    }*/
}
