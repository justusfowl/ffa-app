import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  news : any[] = [];

  constructor() {}

  ngOnInit(){

    let news = [

      {
        "header" : "AKTUELLES",
        "title" : "harald", 
        "text" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ipsum sem, sodales rhoncus aliquet non, volutpat id lacus. Donec fringilla sit amet ante quis ultrices. Aenean suscipit, est id ultrices auctor, est ipsum efficitur dui, nec mollis risus neque ac mi. Integer est dui, tincidunt in lorem id, scelerisque semper urna.",
        "image" : "https://www.facharztpraxis-fuer-allgemeinmedizin.de/images/landing_img.png"

      },
      {
        "header" : "asdasd",
        "title" : "harald2", 
        "text" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ipsum sem, sodales rhoncus aliquet non, volutpat id lacus. Donec fringilla sit amet ante quis ultrices. Aenean suscipit, est id ultrices auctor, est ipsum efficitur dui, nec mollis risus neque ac mi. Integer est dui, tincidunt in lorem id, scelerisque semper urna.",
        "image" : "https://www.facharztpraxis-fuer-allgemeinmedizin.de/images/landing_img.png"

      },
      {
        "header" : "AKTUELLES",
        "title" : "harald3", 
        "text" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ipsum sem, sodales rhoncus aliquet non, volutpat id lacus. Donec fringilla sit amet ante quis ultrices. Aenean suscipit, est id ultrices auctor, est ipsum efficitur dui, nec mollis risus neque ac mi. Integer est dui, tincidunt in lorem id, scelerisque semper urna.",
        "image" : "https://www.facharztpraxis-fuer-allgemeinmedizin.de/images/landing_img.png"

      }

    ];

    this.news = news;
  }

  clickOpen(evt){
    console.log(evt);
  }

  clickClosed(evt){
    console.log(evt);
  }
}
