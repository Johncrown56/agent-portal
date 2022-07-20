import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin, map, mergeMap, switchMap } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  //topics: any;
  articles: any;
  topics : any [] = [];

  constructor(private dataService: DataService, public http: HttpClient) { }

  ngOnInit(): void {
    //this.getAllTopics();
    //this.getAllTopics2();
    this.get2();
    //this.get1();
  }

  getAllTopics() {
    let params = "portalId="+ environment.eGain.portalId + "&usertype=" + environment.eGain.usertype + "&rangesize=7&level=-1";
    this.dataService.getAllTopics(params).subscribe((res: any) => {
      console.log(res);
      this.topics = res.topicTree;
      const conditionArr = [];
       for(let i = 0; i<res.topicTree.length; i++){
         const topicId = res.topicTree[i].topic.id;
         console.log(topicId);
        let params2 = "topicId="+topicId+"&portalId=" + environment.eGain.portalId + "&usertype=" + environment.eGain.usertype + "&rangesize=7&level=-1";
        this.dataService.getAllArticlesByTopicId(params2).subscribe((result: any) => {
          console.log(result);
          this.articles = result; 
          conditionArr.push(this.articles);
                
        })        
       }            
      //  res.topicTree.foreach(
        
      //   address => this.addresses.push(address)
      // )
      // {
      //   const topicId = res.topicTree.topic.id;
      // }
    })
    
  }

  get2(){
    let params = "portalId="+ environment.eGain.portalId + "&usertype=" + environment.eGain.usertype + "&rangesize=7&level=-1";
    this.dataService.getAllTopics(params)
    .pipe(
      switchMap((obj: any) => {
        const data = obj.topicTree;
        console.log(data);
        for(const d of data){
          console.log(d.topic.id);
          return d.topic.id;
        }
        // data.foreach((element: any) => {
        //  return element.topic.id;
        // })
        //return data;
      }),
      mergeMap((topic: any) =>
          this.dataService.getAllArticlesByTopicId("topicId="+topic+"&portalId=" + environment.eGain.portalId + "&usertype=" + environment.eGain.usertype + "&rangesize=7&level=-1")
          //forkJoin(topic.map(id => this.dataService.getAllArticlesByTopicId("topicId="+id+"&portalId=" + environment.eGain.portalId + "&usertype=" + environment.eGain.usertype + "&rangesize=7&level=-1")))
      ),
    ).subscribe(response => {
      console.log(response); // response is a series of CustomField
    });
  }

  get1(){
    let params = "portalId="+ environment.eGain.portalId + "&usertype=" + environment.eGain.usertype + "&rangesize=7&level=-1";
    this.dataService.getAllTopics(params)
    .pipe(
      map((obj: any) => {
        const data = obj.topicTree;
        console.log(data);
        return data;
      }
      ),
      mergeMap(ids =>
          forkJoin(ids.map((topic: any) => this.dataService.getAllArticlesByTopicId("topicId="+topic.id+"&portalId=" + environment.eGain.portalId + "&usertype=" + environment.eGain.usertype + "&rangesize=7&level=-1")))
      ),
    ).subscribe(response => {
      console.log(response); // response is CustomFields[]
    });
  }

  getAllTopics2(){
    let params = "portalId="+ environment.eGain.portalId + "&usertype=" + environment.eGain.usertype + "&rangesize=7&level=-1";
    // this.http.get(environment.eGain.baseUrl+environment.eGain.siteUrl+params).pipe(map(datas => {
    //   const data = datas[0];
    //   this.d = data.topicTree.topic;
    //   return data;
    //   }),
    //   mergeMap(data =>
    //      this.http.get(environment.eGain.baseUrl+environment.eGain.siteUrl+"topicId="+res.topicTree[i].topic.id+"&portalId=" + environment.eGain.portalId + "&usertype=" + environment.eGain.usertype + "&rangesize=7&level=-1") )
    //   ).subscribe( res => {
    //   this.response = res;
    //   });

console.log('reach here');
this.http.get(environment.eGain.baseUrl+environment.eGain.siteUrl+params).pipe(map(users => {
const user = users;
console.log(user);
return user;
}),
mergeMap (user => {
const posts = this.http.get(environment.eGain.baseUrl+environment.eGain.siteUrl+"topicId="+"200100000013574"+"&portalId=" + environment.eGain.portalId + "&usertype=" + environment.eGain.usertype + "&rangesize=7&level=-1"); 
return forkJoin( [posts]);
})
).subscribe( result => {
let rest= result[0];
console.log(rest);






});
  }

}
