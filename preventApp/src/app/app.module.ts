import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { PesquisaLarvarialPage } from '../pages/pesquisaLarvarial/pesquisaLarvarial';
import { CadastroImoveisPage } from '../pages/cadastroImoveis/cadastroImoveis';
import { TratamentoVetorialPage } from '../pages/tratamentoVetorial/tratamentoVetorial';
import { AuthService } from '../services/auth.service';
import { SyncService } from '../services/sync.service';
import { RegiaoService } from '../services/regiao.service';
import { BairroService } from '../services/bairro.service';
import { ImovelService } from '../services/imoveis.service';
import { UserDAO } from '../dao/user.dao';
import { RegiaoDAO } from '../dao/regiao.dao';
import { BairroDAO } from '../dao/bairro.dao';
import { ImovelDAO } from '../dao/imoveis.dao';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    PesquisaLarvarialPage,
    CadastroImoveisPage,
    TratamentoVetorialPage    
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    PesquisaLarvarialPage,
    CadastroImoveisPage,
    TratamentoVetorialPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, UserDAO, RegiaoDAO, BairroDAO, SyncService, RegiaoService, BairroService, ImovelService, ImovelDAO]
})
export class AppModule {}
