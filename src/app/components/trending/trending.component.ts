import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {
  articles: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  getArt(){
    const addParams = '$level=-1';
    this.dataService.getMostViewedArticles(addParams).subscribe((res: any) => {
      console.log(res);
      this.articles = res.article;
  }),( (error: any) =>{
    console.log(error);
  });
  }

}
