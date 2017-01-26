import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { PesquisaLarvarialPage } from '../pages/pesquisaLarvarial/pesquisaLarvarial';
import { CadastroImoveisPage } from '../pages/cadastroImoveis/cadastroImoveis';
import { TratamentoVetorialPage } from '../pages/tratamentoVetorial/tratamentoVetorial';

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
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
