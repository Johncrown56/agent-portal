import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.component.html',
  styleUrls: ['./home-tab.component.css']
})
export class HomeTabComponent implements OnInit {
  changeArticles: any;
  newArticles:any;
  articleDir = environment.eGain.articleDir;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getChangedArticles();
    this.getnewArticles();
  }

  getnewArticles() {
    let addParams =  "$level=0";
    this.dataService.getnewArticles(addParams).subscribe((res: any) => {
      console.log(res);
      if(res.callInfo.httpStatus == "200" && res.callInfo.status == "success"){
        this.newArticles = res.folder[0].article;        
      }
    })
    
  }

  getChangedArticles() {
    let addParams =  "$level=0";
    this.dataService.getChangedArticles(addParams).subscribe((res: any) => {
      console.log(res);
      if(res.callInfo.httpStatus == "200" && res.callInfo.status == "success"){
        this.changeArticles = res.folder[0].article;        
      }
    })
    
  }

  clean_and_hyphenate(string: string) {
    var string = string.trim();
    var string = string.toLowerCase();
    var string = string.replace(' ', '-'); // Replaces all spaces with hyphens.
    var string = string.replace('/[^A-Za-z0-9\-]/', ''); // Removes special chars.
    //var fixed = text.replace(/\s+/g, '-');
    return string.replace(/\s+/g, '-'); // Replaces multiple hyphens with single one.
    }

}
