import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators';
import { VocabularyService } from 'h21-be-ui-kit';
import { Observable } from 'rxjs';
import { SearchFlightDto, Passenger, SearchResult, City } from 'h21-be-ui-kit';

@Injectable()
export class PrototypeVocabularyService implements VocabularyService {

	constructor(private _http: HttpClient) {
	}

	public getCities(pattern: string): Observable<City[]> {
		if (!pattern || pattern.length < 2) {
			return Observable.create();
		}
		return this._http.get<City[]>("../../../assets/prototype-storage/Cities.json")
			.pipe(map(data => {
				return data.filter(x => x.name.indexOf(pattern) != -1)
					.filter((i, index) => (
						index < 10
					));
			}));
	}

	public searchFlights(options: SearchFlightDto): Observable<SearchResult> {

		switch (options.searchMode) {
			case 'round_trip':
				return this._http.get<SearchResult>('../../../assets/prototype-storage/round-trip.json');
			case 'one_way':
				return this._http.get<SearchResult>('../../../assets/prototype-storage/one-way.json');
			case 'multi_city':
				return this._http.get<SearchResult>('../../../assets/prototype-storage/multicity.json');
			default:
				return undefined;
		}
	}

	public searchPassengers(pattern: string): Observable<Passenger[]> {
		if (!pattern) {
			return Observable.create();
		}
		return this._http.get<Passenger[]>("../../../assets/prototype-storage/passengers.json")
			.pipe(map(data => {
				return data.filter(x => (x.firstName && x.firstName.indexOf(pattern) != -1)
										|| (x.surname && x.surname.indexOf(pattern) != -1))
					.filter((i, index) => (
						index < 10
					));
			}));
	}
}
