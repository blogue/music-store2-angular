import { Component } from 'angular2/core';
import { Album } from './album.model';
import { AlbumListComponent } from './album-list.component';

@Component({
  selector: 'display-cart-details',
  inputs: ['album'],
  template:`
    <h4>{{album.title}} | {{album.artist}} | {{album.price}} | {{album.genre}}</h4>
  `
})
export class DisplayInCartDetails {
  public album: Album;
}
