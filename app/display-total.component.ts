import { Component } from 'angular2/core';
import { Album } from './album.model';
import { AlbumListComponent } from './album-list.component';
import { CartPipe } from './cart.pipe';

@Component({
  selector: 'display-cart',
  inputs: ['albumList'],
  pipes: [CartPipe],
  template:`
    <h4 *ngFor="#album of albumList | cart">{{album.title}} | {{album.artist}} | {{album.price}} | {{album.genre}}</h4>
    <h1>Total: {{getInCartTotal()}}</h1>
  `
})
export class DisplayInCartTotal {
  public albumList: Album[];
  public total: number = 0;
  public inCart: Album[] = [];
  getInCartTotal(){
    this.total = 0;
    for(var i = 0; i < this.albumList.length; i++){
      if(this.albumList[i].inCart){
        this.total += this.albumList[i].price;
      }
    }
    return this.total.toFixed(2);
  }
}
