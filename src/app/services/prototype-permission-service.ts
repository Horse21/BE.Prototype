import { Injectable } from '@angular/core';
import { AuthData } from 'app/dto/auth-data';
import { PermissionService } from 'h21-be-ui-kit';

@Injectable()
export class PrototypePermissionService implements PermissionService {
	private authData: AuthData;

	constructor() {
		this.authData = JSON.parse(localStorage.getItem("authData"));
	}

	public isAuth(): boolean {
		return !!this.authData;
	}

	public getUsername(): string {
		return this.isAuth() ? this.authData.name : null;
	}

	public isInRole(role: string): boolean {
		return true;
	}

	public isAgent(id: number): boolean {
		return true;
	}

	public isAgencyManager(id: number): boolean {
		return true;
	}

	public isBranchManager(id: number): boolean {
		return true;
	}
}
