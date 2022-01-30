import { CdkPortal, DomPortalOutlet } from '@angular/cdk/portal';
import { AfterViewInit, ApplicationRef, Component, ComponentFactoryResolver, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DeckListTrackerService } from 'src/app/services/deck-list-tracker.service';

@Component({
  selector: 'window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements AfterViewInit {

  @Output()
  windowClosed: Subject<void> = new Subject();
  // STEP 1: get a reference to the portal
  @ViewChild(CdkPortal) portal: CdkPortal | undefined;

  // STEP 2: save a reference to the window so we can close it
  private externalWindow: Window | null = null;

  // STEP 3: Inject all the required dependencies for a PortalHost
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector) { }


  ngAfterViewInit() {
    // STEP 4: create an external window
    this.externalWindow = window.open('', '', '');

    if (this.externalWindow) {
      // STEP 5: create a PortalHost with the body of the new window document    
      const host = new DomPortalOutlet(
        this.externalWindow.document.body,
        this.componentFactoryResolver,
        this.applicationRef,
        this.injector
      );

      // STEP 6: Attach the portal
      host.attach(this.portal);

      this.externalWindow.addEventListener("beforeunload", () => {
        host.detach();
        this.windowClosed.next();
      });


    }


  }

  ngOnDestroy() {
    if (this.externalWindow) {
      this.externalWindow.close()
    }
  }
}
