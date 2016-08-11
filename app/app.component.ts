import { Component } from 'angular2/core';
import { Album } from './album.model';
import { AlbumListComponent } from './album-list.component';

@Component({
  selector: 'my-app',
  directives: [AlbumListComponent],
  template: `
    <div class="container">
      <h1>Welcome to the Music Store App!</h1>
      <album-list
      [albumList]="albums"
      (onAlbumSelect)="albumWasSelected($event)">
      </album-list>
    </div>
  `
})

export class AppComponent {
  public albums: Album[];
  constructor(){
    this.albums = [
      new Album("Come with Me", "Martin van Buren", 19.99, "hip hop"),
      new Album("Get Crazy", "Franklin Pierce", 4.99, "pop"),
      new Album("Me and My Dogs", "Millard Fillmore", 9.99, "country")
    ];
  }
  albumWasSelected(clickedAlbum: Album): void{
    console.log(clickedAlbum);
  }
}
