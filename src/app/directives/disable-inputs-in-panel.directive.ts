import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appDisableInputsInPanel]'
})
export class DisableInputsInPanelDirective {
  @Input() appDisableInputsInPanel: boolean | undefined;
  constructor(private el: ElementRef) {


  }

  ngOnChanges(changes: SimpleChanges) {
    const all = this.el.nativeElement.querySelectorAll('[formControlName]')

    all.forEach((x: any) => {
    //  x.disabled  = this.appDisableInputsInPanel;
    });
  }
}

