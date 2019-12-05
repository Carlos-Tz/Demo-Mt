import { Component, OnInit, Input } from '@angular/core';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';
import { F10 } from 'src/app/models/f10';

@Component({
  selector: 'app-row6',
  templateUrl: './row6.component.html',
  styleUrls: ['./row6.component.css']
})
export class Row6Component implements OnInit {

  public off = false;
  @Input() public key: string;
  @Input() public row: F10;
  constructor(
    private readonly offlineOnlineService: OfflineOnlineService
  ) { }

  ngOnInit() {
   // console.log(this.row);
    if (this.offlineOnlineService.isOnline) {
      this.off = false;
    } else {
      this.off = true;
    }
  }

}
