import { Component, EventEmitter } from 'angular2/core'
import { Album } from './album.model';
import { AlbumComponent } from './album.component';
import { NewAlbumComponent } from './new-album.component';
import { DisplayInCartTotal } from './display-total.component';
import { DisplayInCartDetails } from './display-cart-details.component';
import { FilterPipe } from './cart.pipe';

@Component({
  selector: 'album-list',
  inputs: ['albumList'],
  outputs: ['onAlbumSelect'],
  pipes: [FilterPipe],
  directives:[AlbumComponent, NewAlbumComponent, DisplayInCartTotal, DisplayInCartDetails],
  template: `
  <div class="container">
    <album-display *ngFor="#currentAlbum of albumList"
    (click)="albumClicked(currentAlbum)"
    [class.selected]="currentAlbum === selectedAlbum"
    [album]="currentAlbum">
    </album-display>
    <new-album
      (onSubmitNewAlbum)="createAlbum($event)"></new-album>
      <h2>Cart:</h2>
      <display-cart-details *ngFor="#currentAlbum of albumList | cart"
      [album]="currentAlbum"></display-cart-details>
      <display-cart-total
        [albumList]="albumList"></display-cart-total>
  </div>
  `
})
export class AlbumListComponent {
  public albumList: Album[];
  public onAlbumSelect: EventEmitter<Album>;
  public selectedAlbum: Album;
  constructor(){
    this.onAlbumSelect = new EventEmitter();
  }
  albumClicked(clickedAlbum: Album): void {
    this.selectedAlbum = clickedAlbum;
    this.onAlbumSelect.emit(clickedAlbum);
  }
  createAlbum(param): void {
    this.albumList.push(
      new Album(param[0], param[1], parseFloat(param[2]), param[3])
    );
  }
}
