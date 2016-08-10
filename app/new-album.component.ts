import { Component, EventEmitter } from 'angular2/core';
import { Album } from './album.model';

@Component({
  selector: 'new-album',
  outputs: ['onSubmitNewAlbum'],
  template:`
  <div>
    <h3>Add a Album</h3>
    <input placeholder="Title" class="col-sm-12 input-lg" #newTitle required>
    <input placeholder="Artist" class="col-sm-12 input-lg" #newArtist required>
    <input placeholder="Price" class="col-sm-12 input-lg" #newPrice required>
    <input placeholder="Genre" class="col-sm-12 input-lg" #newGenre required>
    <button (click)="addAlbum(newTitle, newArtist, newPrice, newGenre)" class="btn-success btn-lg">Add</button>
  </div>
  `
})

export class NewAlbumComponent {
  public onSubmitNewAlbum: EventEmitter<string[]>;
  constructor(){
    this.onSubmitNewAlbum = new EventEmitter();
  }
  addAlbum(albumTitle: HTMLInputElement, albumArtist: HTMLInputElement, albumPrice: HTMLInputElement, albumGenre: HTMLInputElement){
      var model: string[] = [albumTitle.value, albumArtist.value, albumPrice.value, albumGenre.value];
      this.onSubmitNewAlbum.emit(model);
      albumTitle.value = "";
      albumArtist.value = "";
      albumPrice.value = "";
      albumGenre.value = "";
  }
}
