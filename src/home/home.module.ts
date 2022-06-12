import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { httpLoaderFactory } from 'src/app/app.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory
      },
      defaultLanguage: 'en'
    }),
    CommonModule,
    HomeRoutingModule,
    MatButtonModule
  ]
})
export class HomeModule { }
