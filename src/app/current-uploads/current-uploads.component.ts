import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { environment } from '../../environments/environment';
import { Utility } from '../Helpers/utility';

@Component({
  selector: 'app-current-uploads',
  templateUrl: './current-uploads.component.html',
  styleUrls: ['./current-uploads.component.css']
})
export class CurrentUploadsComponent implements OnInit, OnChanges {
  private uploadCompleteCounter: number = 0;
  public files: File[] = [];
  public panelOpen: boolean = false;
  @Input('inbound-listener') inBoundListener: any;
  @Output('outbound-listener') outBoundListener = new EventEmitter();
  
  constructor() { }
  
  ngOnInit() {
    this.panelOpen = (this.files.length > 0);
  }
  
  ngOnChanges(changes: SimpleChanges): void { 
    // * - receive selected files       
    if(!changes.inBoundListener.firstChange){ 
      this.files = (changes.inBoundListener.currentValue as File[]);
      this.panelOpen = (this.files.length > 0);
    } 
  }

  listenCurrentUploadItemComponent(event: any){
    switch(event.type){
      case environment.component_events.FILE_UPLOAD_COMPLETE:
        this.uploadCompleteCounter++;
        break;
      default:
        break;
    };

    if(this.files.length == this.uploadCompleteCounter){
      this.files = [];
      this.uploadCompleteCounter = 0;      
    }
  }
}
