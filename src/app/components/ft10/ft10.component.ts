import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ft10',
  templateUrl: './ft10.component.html',
  styleUrls: ['./ft10.component.css']
})
export class Ft10Component implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  goBack = () => {
    this.location.back();
  }
}
