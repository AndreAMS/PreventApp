import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { PesquisaLarvarialPage } from '../pages/pesquisaLarvarial/pesquisaLarvarial';
import { CadastroImoveisPage } from '../pages/cadastroImoveis/cadastroImoveis';
import { TratamentoVetorialPage } from '../pages/tratamentoVetorial/tratamentoVetorial';
import { VistoriaPesquisaPage } from '../pages/vistoriaPesquisa/vistoriaPesquisa';
import { VistoriaPage } from '../pages/vistoria/vistoria';
import { AuthService } from '../services/auth.service';
import { SyncService } from '../services/sync.service';
import { RegiaoService } from '../services/regiao.service';
import { PlanejamentoService } from '../services/planejamento.service';
import { BairroService } from '../services/bairro.service';
import { ImovelService } from '../services/imoveis.service';
import { AtividadeService } from '../services/atividade.service';
import { VistoriaService } from '../services/vistoria.service';
import { UserDAO } from '../dao/user.dao';
import { RegiaoDAO } from '../dao/regiao.dao';
import { BairroDAO } from '../dao/bairro.dao';
import { ImovelDAO } from '../dao/imoveis.dao';
import { AtividadeDAO } from '../dao/atividade.dao';
import { VistoriaDAO } from '../dao/vistoria.dao';
import { PlanejamentoDAO } from '../dao/planejamento.dao';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    PesquisaLarvarialPage,
    CadastroImoveisPage,
    TratamentoVetorialPage,
    VistoriaPage,
    VistoriaPesquisaPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    QRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    PesquisaLarvarialPage,
    CadastroImoveisPage,
    TratamentoVetorialPage,
    VistoriaPage,
    VistoriaPesquisaPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, UserDAO, RegiaoDAO, BairroDAO, SyncService, RegiaoService, BairroService, ImovelService, VistoriaService, ImovelDAO, AtividadeService, AtividadeDAO, VistoriaDAO, PlanejamentoService, PlanejamentoDAO]
})
export class AppModule {}
