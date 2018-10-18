import {IPosition} from "./i-position";

export interface IMarker {
	position: IPosition;
	title?: string;
	visible?: boolean;
}
