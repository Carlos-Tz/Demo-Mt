import { Component, OnInit, Input } from '@angular/core';
import { F10 } from 'src/app/models/f10';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {

  @Input() public key: string;
  @Input() public row: F10;
  constructor() { }

  ngOnInit() {
   // console.log(this.row);
  }

}
