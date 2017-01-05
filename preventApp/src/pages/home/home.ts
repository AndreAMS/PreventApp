import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { CadastroImoveisPage } from '../cadastroImoveis/cadastroImoveis';
import { PesquisaLarvarialPage } from '../pesquisaLarvarial/pesquisaLarvarial';
import { TratamentoVetorialPage } from '../tratamentoVetorial/tratamentoVetorial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(public navCtrl: NavController) {
     
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
