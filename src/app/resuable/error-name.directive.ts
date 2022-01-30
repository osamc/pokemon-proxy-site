import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[errorName]'
})
export class ErrorNameDirective {

  @Input()
  errorName: string = '';

  constructor(public template: TemplateRef<any>) { 

    console.log(template);

  }

}
