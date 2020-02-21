import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataservice';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss', '../app.component.scss'],
})
export class NewsDetailPage implements OnInit {

  NEWS_TITLE : string = "";
  newsObj : any; 
  newsId : string = "";

  constructor(
      private dataSrv: DataService, 
      private route : ActivatedRoute
  ) {
    
    this.route.params.subscribe(params => {
      this.newsId = params.newsId;
      this.getNewsObject(this.newsId);
    });
  }

  ngOnInit() {

  }

  getNewsObject(newsId){
    this.dataSrv.get("/news/" + newsId).then((result : any) => {
      this.newsObj = result;
      this.NEWS_TITLE = result.header;
    })
  }

  getImageUrl(img){
    if (img.image){
      return img.image;
    }else{
      return "https://www.facharztpraxis-fuer-allgemeinmedizin.de/images/landing_img.png";
    }
  }

}
