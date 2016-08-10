import { Component } from 'angular2/core';
import { Album } from './album.model';

@Component ({
  selector: 'album-display',
  inputs: ['album'],
  template: `
  <input *ngIf="album.inCart" type="checkbox" checked (click)="toggleInCart(false)"/>
  <input *ngIf="!album.inCart" type="checkbox" (click)="toggleInCart(true)"/>
  <label>{{album.title}} | {{album.artist}} | {{album.price}} | {{album.genre}}</label> <br>
  `
})
export class AlbumComponent {
  public album: Album;
  toggleInCart(setState: boolean){
    this.album.inCart = setState;
  }
}
