import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { filter, BehaviorSubject } from 'rxjs';
import { BreadcrumbItem } from '../models/breadcrumb.interface';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private breadcrumbSource$ = new BehaviorSubject<BreadcrumbItem[]>([]);
  breadcrumbs$ = this.breadcrumbSource$.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const root = this.router.routerState.snapshot.root;
        const breadcrumbs = this.buildBreadcrumbs(root);
        this.breadcrumbSource$.next(breadcrumbs);
        console.log(`chemi ${root}`, `daaa ${breadcrumbs}`);
      });
  }

  private buildBreadcrumbs(
    route: ActivatedRouteSnapshot,
    url: string = '',
    breadcrumbs: BreadcrumbItem[] = [],
  ) {
    const routeURL = route.url.map((seg) => seg.path).join('/');
    const nextUrl = routeURL ? `${url}/${routeURL}` : url;

    console.log(`ეს ცალკე კიდე ${routeURL}`, `da esesc calke ${nextUrl}`);

    if (route.data && route.data['title']) {
      breadcrumbs.push({
        title: route.data['title'],
        url: nextUrl,
      });
    }

    if (route.firstChild) {
      return this.buildBreadcrumbs(route.firstChild, nextUrl, breadcrumbs);
    }
    return breadcrumbs;
  }
}
