import {HttpClient} from '@angular/common/http';
import {Component, ViewChild } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry, MatSidenav} from '@angular/material';
import {
	H21AirSearchResultComponent,
	INotifyItem,
	ISearchHistoryCard,
	ISidebarNavTab,
	IUserCardData,
	SearchFlightDto
} from 'h21-be-ui-kit';
import {PermissionService} from 'h21-be-ui-kit';
import {H21RightOverlayPanelService} from 'h21-be-ui-kit';
import {AuthData} from '../../dto/auth-data';

const SIDEBAR_NAV_TABS: Array<ISidebarNavTab> = [
	{name: 'search', label: 'Search', icon: 'search', type: 'button', url: null, disabled: false},
	{name: 'filter', label: 'Filter', icon: 'filter_list', type: 'button', url: null, disabled: true},
	{name: 'history', label: 'History', icon: 'history', type: 'button', url: null, disabled: false},
];

const SEARCH_HISTORY_DATA: ISearchHistoryCard[] = [
	{ id: 1, payment: 'Payment on account', destination: 'Rome, Italy', adultCount: 2, roomCount: 1 },
	{ id: 2, payment: 'Payment on account', destination: 'Rome, Italy', adultCount: 2, roomCount: 1 },
	{ id: 3, payment: 'Payment on account', destination: 'Rome, Italy', adultCount: 2, roomCount: 1 },
	{ id: 4, payment: 'Payment on account', destination: 'Rome, Italy', adultCount: 2, roomCount: 1 }
];

const USER_CARD_DATA: IUserCardData = {
	user: {
		name: 'Marco Montagni',
		email: 'test@viaddi1.it',
		avatarUrl: './assets/img/avatar.png',
	},
	actions: [
		{
			name: 	'profile',
			label:	'My profile',
			icon:	'person',
			route:	'',
			type:	'button'
		}
	]
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
	@ViewChild('sidenav') private _sidenav: MatSidenav;
	@ViewChild('searchResult') private _searchResult: H21AirSearchResultComponent;

	userName: string;
	userCardData: IUserCardData;
	activeSidenavPanel: string;
	sidenavOpened: boolean;
	searchResultVisibility: boolean;
	searchResultViewMode: string;
	sidebarNavDisabled: boolean;
	sidebarNavTabs: ISidebarNavTab[];
	sidenavMode: string;
	contentSidenavHasBackdrop: boolean;
	searchHistoryData: ISearchHistoryCard[];

	private permissionService: PermissionService;

	constructor(
		iconReg: MatIconRegistry,
		sanitizer: DomSanitizer,
		private http: HttpClient,
		permissionService: PermissionService,
		private rightPanelDialog: H21RightOverlayPanelService
	) {
		this.permissionService = permissionService;
		if(this.permissionService.isAuth()) {
			this.userName = this.permissionService.getUsername();
		}
		this.init();
	}

	init() {
		this.userName = 'Zucchetti | Marco Montagni';
		this.userCardData = USER_CARD_DATA;
		this.searchHistoryData = SEARCH_HISTORY_DATA;
		this.activeSidenavPanel = 'search';
		this.sidenavOpened = true;
		this.searchResultVisibility = false;
		this.searchResultViewMode = 'LIST';
		this.sidebarNavDisabled = false;
		this.sidebarNavTabs = SIDEBAR_NAV_TABS;
		this.sidenavMode = 'side';
		this.contentSidenavHasBackdrop = false;
	}

	prototypeAuth(data: any): void {
		var authData: AuthData = <AuthData> {
			name: data.name,
			roles: data.roles,
			claims: data.claims
		};
		localStorage.setItem("authData", JSON.stringify(authData));
		location.reload();
	}

	logout(): void {
		localStorage.setItem("authData", null);
		location.reload();
	}

	getNotifyList(): INotifyItem[] {
		return [];
	}

	sidenavToggle() {
		this._sidenav.toggle();
		if (this._sidenav.opened) {
			this.sidebarNavDisabled = false;
			this.sidenavOpened = true;
		} else {
			this.sidebarNavDisabled = true;
			this.sidenavOpened = false;
		}
	}

	showSidebarPanel(tab: ISidebarNavTab): void {
		if (!this._sidenav.opened) {
			this.sidenavToggle();
		}
		this.activeSidenavPanel = tab.name;
	}

	search(options: SearchFlightDto): void {
		this.searchResultVisibility = true;
		this.sidebarNavTabs.find((item) => { return item.name == 'filter'; }).disabled = false;
		setTimeout(() => {
			this._searchResult.search(options);
			this.sidebarNavTabs[1].disabled = false;
			this.activeSidenavPanel = 'filter';
		}, 0);
	}

	clearSearch(): void {
		this.searchResultVisibility = false;
		this.searchResultViewMode = 'LIST';
		this.sidebarNavTabs.find((item) => { return item.name == 'filter'; }).disabled = true;
		if (this._searchResult) {
			this.sidebarNavTabs[1].disabled = true;
			this._searchResult.clear();
		}
	}

	setSearchResultTitle(): void {
		this._searchResult.titleText = "Rome, Italy (ROM) to - Milan, Italy (MIL)";
		this._searchResult.subTitleText = "Fri 18 May - Fri 25 May 1 adult. Economy";
	}

	changeResultViewMode(mode: string): void {
		this.searchResultViewMode = mode;
	}

	openHelpSection(): void {
		this.rightPanelDialog.open('h21-help');
	}

}
