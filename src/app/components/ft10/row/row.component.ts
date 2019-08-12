import { Component, OnInit, Input } from '@angular/core';
import { F10 } from 'src/app/models/f10';
import { OfflineOnlineService } from 'src/app/services/offline-online.service';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {

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
