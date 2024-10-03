import { Component, OnInit } from '@angular/core';
import { IonAlert, IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
  standalone: true,
  imports: [IonContent, IonAlert, ],
})
export class ItemDetailComponent  implements OnInit {

  constructor() {
    
   }
   public alertButtons = ['OK'];
  public alertInputs = [
    {
      placeholder: 'Name',
    },
    {
      placeholder: 'Nickname (max 8 characters)',
      attributes: {
        maxlength: 8,
      },
    },
    {
      type: 'number',
      placeholder: 'Age',
      min: 1,
      max: 100,
    },
    {
      type: 'textarea',
      placeholder: 'A little about yourself',
    },
  ];

  ngOnInit() {}

}
