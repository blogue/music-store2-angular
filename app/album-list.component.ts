import { Component, EventEmitter } from 'angular2/core'
import { Album } from './album.model';
import { AlbumComponent } from './album.component';
import { NewAlbumComponent } from './new-album.component';
import { DisplayInCartTotal } from './display-total.component';
import { CartPipe } from './cart.pipe';
import { FilterPipe } from './filter.pipe';
import { SortPipe } from './sort.pipe';

@Component({
  selector: 'album-list',
  inputs: ['albumList'],
  outputs: ['onAlbumSelect'],
  pipes: [CartPipe, FilterPipe, SortPipe],
  directives:[AlbumComponent, NewAlbumComponent, DisplayInCartTotal],
  template: `
  <div class="container">
    <label>Filter by Genre: </label>
    <select id="selectGenre" (change)="onChangeGenre($event.target.value)" class="filter">
      <option value="allGenres" selected="selected">Show All</option>
      <option *ngFor="#album of albumList" value="{{album.genre}}">{{album.genre}}</option>
    </select>
    <label>Filter by Artist: </label>
    <select id="selectArtist" (change)="onChangeArtist($event.target.value)" class="filter">
      <option value="allArtists" selected="selected">Show All</option>
      <option *ngFor="#album of albumList" value="{{album.artist}}">{{album.artist}}</option>
    </select>
    <label>Sort: </label>
    <select (change)="onChangeSort($event.target.value)" class="filter">
      <option value="price" selected="selected">Price</option>
      <option value="artist">Artist</option>
    </select>
    <div class="row">
    <album-display *ngFor="#currentAlbum of albumList | filter:filterGenre:filterArtist | sort:sortByProperty"
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
  public sortByProperty: string = "price";
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
  onChangeSort(filterOption) {
    this.sortByProperty = filterOption;
  }
}
