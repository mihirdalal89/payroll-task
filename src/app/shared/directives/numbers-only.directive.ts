import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]',
  // exportAs:'numbersOnly'
})
export class NumbersOnlyDirective {
  counter:number=0;
  constructor(private el:ElementRef) { }

  @HostListener('input',['$event']) onInputChange(event:any){
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initialValue.replace(/[^0-9]*/g,'');
    if(initialValue!==this.el.nativeElement.value){
       event.preventDefault();
    }
  }
}
