import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  post(endPoint: string, data: any) {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredentials: false };
    const url = environment.eGain.baseUrl + environment.eGain.siteUrl + endPoint;

    //this.dismiss = this.loadingService.isLoading == false ? this.dismissLoader() : true;
    return this.http.post(url, JSON.stringify(data), options).pipe(
      finalize(() => {
      //this.dismissLoader;
    })
    );
  }

  get(endPoint: string) {
    const headers = new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
    });
    const options = { headers: headers, withCredentials: false };
    const params = "&portalId="+ environment.eGain.portalId + "&usertype=" + environment.eGain.usertype;
    const url = environment.eGain.baseUrl + environment.eGain.siteUrl+ endPoint + params;
    return this.http.get(url, options).pipe(finalize(() => {
      //this.dismissLoader();
    }))
  }
}
