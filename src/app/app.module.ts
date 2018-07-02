import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider';
import { PrototypePermissionService } from '../app/services/prototype-permission-service';
import { PrototypeVocabularyService } from '../app/services/prototype-vocabulary-service';
import { PermissionService } from 'h21-be-ui-kit';
import { MatInputModule, MatNativeDateModule } from '@angular/material';
import { VocabularyService } from 'h21-be-ui-kit';
import { H21RightOverlayPanelService } from 'h21-be-ui-kit';
import { AppSubscriberService } from 'h21-be-ui-kit';
import { OrderService } from 'h21-be-ui-kit';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './modules/app-material.module';
import { H21HeaderModule, H21SidebarModule, H21TopToolbarModule } from 'h21-be-ui-kit';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '**', redirectTo: '/'},
];

@NgModule({
		declarations: [
			AppComponent
		],
		imports: [
			BrowserModule,
			RouterModule.forRoot(routes),
			BrowserAnimationsModule,
			AppMaterialModule,
			ReactiveFormsModule,
			FormsModule,
			HttpClientModule,
			MatInputModule,
			MatNativeDateModule,
			NouisliderModule,
			H21HeaderModule,
			H21SidebarModule,
			H21TopToolbarModule
		],
		providers: [
			{
				provide: PermissionService,
				useClass: PrototypePermissionService
			},
			{
				provide: VocabularyService,
				useClass: PrototypeVocabularyService
			},
			H21RightOverlayPanelService,
			AppSubscriberService,
			OrderService
		],
		bootstrap: [AppComponent],
		entryComponents: []
	}
)
export class AppModule {
}
