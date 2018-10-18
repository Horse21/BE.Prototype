import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider';
import { PrototypePermissionService } from '../app/services/prototype-permission-service';
import { PrototypeVocabularyService } from '../app/services/prototype-vocabulary-service';
import {
	H21HeaderModule,
	H21TopToolbarModule,
	H21AirFilterPanelModule,
	H21AirSearchPanelModule,
	H21AirSearchResultModule,
	H21SearchHistoryPanelModule,
	PermissionService,
	OrderService,
	VocabularyService,
	H21RightOverlayPanelService,
	AppSubscriberService,
	H21SidebarNavModule
} from 'h21-be-ui-kit';
import { MatInputModule, MatNativeDateModule } from '@angular/material';
import { AppComponent } from './components/app/app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './modules/app-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { H21MapComponent } from './components/h21-map/h21-map.component';


const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '**', redirectTo: '/'},
];

@NgModule({
		declarations: [
			AppComponent,
			H21MapComponent,
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
			H21SidebarNavModule,
			H21TopToolbarModule,
			H21AirSearchResultModule,
			H21AirFilterPanelModule,
			H21AirSearchPanelModule,
			H21SearchHistoryPanelModule
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
