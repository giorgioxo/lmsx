import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from './models/breadcrumb.interface';
import { BreadcrumbService } from './services/breadcrumb.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'lmsx-breadcrumb',
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs$: Observable<BreadcrumbItem[]>;
  constructor(private breadcrumbService: BreadcrumbService) {}
  ngOnInit() {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
  }
}
