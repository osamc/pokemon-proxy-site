import { Component, ContentChildren, OnDestroy, OnInit, Optional, QueryList, Self, ViewChildren } from '@angular/core';
import { ControlValueAccessor, NgControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorNameDirective } from 'src/app/resuable/error-name.directive';


@Component({
  selector: '[display-error]',
  templateUrl: './display-error.component.html',
  styleUrls: ['./display-error.component.scss']
})
export class DisplayErrorComponent implements ControlValueAccessor, OnInit, OnDestroy {

  errorSub: Subscription | undefined;
  errors: ValidationErrors | null = null;

  @ContentChildren(ErrorNameDirective) displayableErrors!: QueryList<ErrorNameDirective>;


  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      ngControl.valueAccessor = this;
    }
  }



  ngOnInit(): void {
    if (this.ngControl) {

      this.updateState();

      this.ngControl.valueChanges?.subscribe(change => {
        this.updateState();
      })

      this.ngControl.statusChanges?.subscribe(change => {
        this.updateState();
      })

    }
  }

  updateState() {
    this.errors = this.ngControl.errors;
  }

  ngOnDestroy(): void {
    this.errorSub?.unsubscribe();
  }

  writeValue(obj: any): void {
    //doesn't matter
  }

  registerOnChange(fn: any): void {
    //doesn't matter
  }

  registerOnTouched(fn: any): void {
    //doesn't matter
  }

}
