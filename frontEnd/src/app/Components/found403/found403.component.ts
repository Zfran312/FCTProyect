import { Component, OnInit } from '@angular/core'
import { Constants } from '../../Constants/constants';

@Component({
  selector: 'app-found403',
  templateUrl: './found403.component.html',
})
export class Found403Component implements OnInit {
  message = Constants.FOUND_403_MESSAGE;
  title = Constants.FOUND_403_TITLE;
  header = Constants.FOUND_403_HEADER;

  constructor(){}

  ngOnInit() {}

}