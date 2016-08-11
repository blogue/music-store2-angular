import { Component, EventEmitter } from 'angular2/core'
import { Album } from './album.model';
import { AlbumComponent } from './album.component';
import { NewAlbumComponent } from './new-album.component';
import { DisplayInCartTotal } from './display-total.component';
import { CartPipe } from './cart.pipe';
import { FilterPipe } from './filter.pipe';

@Component({
  selector: 'album-list',
  inputs: ['albumList'],
  outputs: ['onAlbumSelect'],
  pipes: [CartPipe, FilterPipe],
  directives:[AlbumComponent, NewAlbumComponent, DisplayInCartTotal],
  template: `
  <div class="container">
    <select id="selectGenre" (change)="onChangeGenre($event.target.value)" class="filter">
      <option value="allGenres" selected="selected">Show All</option>
      <option *ngFor="#album of albumList" value="{{album.genre}}">{{album.genre}}</option>
    </select>
    <select id="selectArtist" (change)="onChangeArtist($event.target.value)" class="filter">
      <option value="allArtists" selected="selected">Show All</option>
      <option *ngFor="#album of albumList" value="{{album.artist}}">{{album.artist}}</option>
    </select>
    <div class="row">
    <album-display *ngFor="#currentAlbum of albumList | filter:filterGenre:filterArtist"
    (click)="albumClicked(currentAlbum)"
    [class.selected]="currentAlbum === selectedAlbum"
    [album]="currentAlbum">
    </album-display>
    </div>
    <new-album
      (onSubmitNewAlbum)="createAlbum($event)"></new-album>
      <h2>Cart:</h2>
      <display-cart
        [albumList]="albumList"></display-cart>
  </div>
  `
})
export class AlbumListComponent {
  public albumList: Album[];
  public onAlbumSelect: EventEmitter<Album>;
  public selectedAlbum: Album;
  public filterGenre: string = "allGenres";
  public filterArtist: string = "allArtists";
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
  onChangeGenre(filterOption) {
    this.filterGenre = filterOption;
  }
  onChangeArtist(filterOption) {
    this.filterArtist = filterOption;
  }
}
