import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  template: ` <div class="display-3 text-danger fw-semibold text-center mt-5">
    Requested page was not found on this server.
  </div>`,
  styles: ``,
})
export class PageNotFoundComponent {}
