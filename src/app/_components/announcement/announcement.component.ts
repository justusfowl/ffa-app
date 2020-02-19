import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent implements OnInit {

  @Input() isOpen: boolean = false;
  @Input() generalAnnouncement: string = "";


  @Output() isOpenClick: EventEmitter<any> = new EventEmitter();
  @Output() isClosedClick: EventEmitter<any> = new EventEmitter();
  @Output() isGeneralClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  clickIsOpen(evt){
    this.isOpenClick.emit(evt)
  }

  clickGeneralAnnouncement(evt){
    this.isGeneralClick.emit(evt)
  }

  clickIsClosed(evt){
    this.isClosedClick.emit(evt)
  }

}
