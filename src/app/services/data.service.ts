import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { AgentModel } from '../models/data-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  ison = '../../assets/json/ison.json';

  constructor(private httpService: HttpService, public http: HttpClient) { }

  // Get all the topics
  public getAllTopics(values: any): Observable<any> {
    return this.httpService.get('topic?' + values);
  }
  // Get all the articles 
  public getAllArticlesByTopicId(values: any): Observable<any> {
    return this.httpService.get('article?' + values);
  }

  public getnewArticles(values: any): Observable<any> {
    return this.httpService.get('usefulitems/folder/1003?' + values);
  }

  public getChangedArticles(values: any): Observable<any> {
    return this.httpService.get('usefulitems/folder/1004?' + values);
  }

  
  public getMostViewedArticles(values: any): Observable<any> {
    return this.httpService.get('dfaq?' + values);
  }

  

  // Get all the agents data
  public getAllAgents() {
    return this.http.get(this.ison);
  }

  // Get all the agents data with observable
  public getAllAgents2(): Observable<AgentModel[]> {
    return this.http.get<AgentModel[]>(this.ison);
  }

}
