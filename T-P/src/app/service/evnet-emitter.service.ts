import { Injectable, EventEmitter } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

  export class EventEmitterServices {
    invokeFirstComponentFunction = new EventEmitter();    
  subsVar: Subscription;


  onFirstComponentButtonClick() {    
    console.log('started');
    
    this.invokeFirstComponentFunction.emit();    
  }

  }