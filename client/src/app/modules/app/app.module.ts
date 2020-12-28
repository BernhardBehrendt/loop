import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app/app.component';
import {FormsModule} from '@angular/forms';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {PageLetsStartComponent} from './components/page-lets-start/page-lets-start.component';
import {SocketIoConfig} from '../socket-io/interfaces/socket-io-config';
import {SocketIoModule} from '../socket-io/socket-io.module';

const config: SocketIoConfig = {url: '/', options: {'transports': ['websocket', 'polling']}};

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PageLetsStartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
