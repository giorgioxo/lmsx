import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lmsx-main-layout',
  imports: [NavbarComponent, MatSidenavModule, FormsModule],

  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  user = {
    email: 'example@com.ge',
  };
  toggleDrawer() {
    this.drawer.toggle();
  }
}
