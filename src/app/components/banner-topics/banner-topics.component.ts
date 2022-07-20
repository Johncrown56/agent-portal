import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-banner-topics',
  templateUrl: './banner-topics.component.html',
  styleUrls: ['./banner-topics.component.css']
})
export class BannerTopicsComponent implements OnInit {
  bannerTopics: any;
  bannerTopics2: any;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getBannerTopics();
    this.getBannerTopics2();
  }

  getBannerTopics() {
    const addParams = '$rangestart=8&$rangesize=2';
    this.dataService.getAllTopics(addParams).subscribe((res: any) => {
      console.log(res);
      this.bannerTopics = res.topicTree;
  }),( (error: any) =>{
    console.log(error);
  });

  }

  getBannerTopics2() {
    const addParams = '$rangestart=10&$rangesize=1';
    this.dataService.getAllTopics(addParams).subscribe((res: any) => {
      console.log(res);
      this.bannerTopics2 = res.topicTree;
  }),( (error: any) =>{
    console.log(error);
  });

  }

  goToArticle(articleId: any){
    this.router.navigate(['topic/'+articleId]);
  }

}
