import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';
import { UtilsService } from '../services/utils.service';

@Directive({
  selector: '[appColorByPackageNo]'
})
export class ColorByPackageNoDirective {
  @Input() appColorByPackageNo!: number|undefined;
  constructor(private el: ElementRef, private utilSrv: UtilsService) {

  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.appColorByPackageNo == null) return;
    const rgb = this.utilSrv.colorByIndex(this.appColorByPackageNo)

    this.el.nativeElement.style.backgroundColor = 'rgb(' + rgb.join(',') + ')';;

  }

}
