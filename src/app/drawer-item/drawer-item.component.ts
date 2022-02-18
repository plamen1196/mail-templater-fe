import { Component, HostListener, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-drawer-item',
  templateUrl: './drawer-item.component.html',
  styleUrls: ['./drawer-item.component.scss']
})
export class DrawerItemComponent {

  @Input()
  icon: string;

  constructor(private drawer: MatDrawer) { }

  @HostListener('click')
  onClick(): void {
    this.drawer.close();
  }
}
