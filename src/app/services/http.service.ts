import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class HttpService {
	public API_ENDPOINT = localStorage.getItem("api"); // environment.api;
	public API_KEY = localStorage.getItem("key");
	constructor(private http: HttpClient) { }

	public get(path: any, skipBase?: boolean) {
		return this.http.get(skipBase ? path : `${this.API_ENDPOINT}${path}`, { headers: this.headers() }).pipe(
			catchError(this.handleError), map((res) => res),
		);
	}

	public post(path: string, data: any) {
		return this.http.post(`${this.API_ENDPOINT}${path}`, data, { headers: this.headers() }).pipe(
			catchError(this.handleError), map((res) => res));
	}

	public upload(path: any, data: any, progress = false) {
		if (progress) {
			// const headers = this.headers();
			const headers = new HttpHeaders({ "ngsw-bypass": "", ...this.headers() });

			return this.http.post(`${this.API_ENDPOINT}${path}`, data, {
				headers,
				reportProgress: true,
				observe: "events",
				responseType: "json",
			}).pipe(
				catchError(this.handleError));
		}

		return this.http.post(`${this.API_ENDPOINT}${path}`, data, { headers: this.headers() }).pipe(
			catchError(this.handleError), map((res) => res));
	}


	public put(path: any, data: any) {
		return this.http.put(`${this.API_ENDPOINT}${path}`, data, { headers: this.headers() }).pipe(
			catchError(this.handleError), map((res) => res));
	}

	public patch(path: any, data: any) {
		return this.http.patch(`${this.API_ENDPOINT}${path}`, data, { headers: this.headers() }).pipe(
			catchError(this.handleError), map((res) => res));
	}

	public delete(path: any) {
		return this.http.delete(`${this.API_ENDPOINT}${path}`, { headers: this.headers() }).pipe(
			catchError(this.handleError), map((res) => res));
	}

	private headers() {
		const headers = {};
		if (this.API_KEY) {
			headers["x-api-key"] = this.API_KEY;
		}

		return headers;
	}
	private handleError(error: HttpErrorResponse) {

		if (error.error instanceof ErrorEvent) {
			console.error("An error occurred:", error.error.message);
		} else {
			console.log(error)
			console.error(
				`Backend returned code ${error.status}, ` +
				`body was: ${error.error.message}`);
			return throwError(
				error.error.message);
		}
		return throwError(
			"Something bad happened; please try again later.");
	}

}
