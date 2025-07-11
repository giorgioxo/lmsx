import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'lmsx-main-layout',
  imports: [NavbarComponent, MatSidenavModule],

  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  toggleDrawer() {
    this.drawer.toggle();
  }
}
