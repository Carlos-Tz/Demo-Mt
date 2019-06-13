import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {

  @Input() public j: number;
  @Input() public page: any;
  constructor() { }

  ngOnInit() {
  }

}
