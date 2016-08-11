import { Pipe, PipeTransform } from 'angular2/core';
import { Album } from './album.model';

@Pipe({
  name: 'cart',
  pure: false
})
export class CartPipe implements PipeTransform {
  transform(input: Album[], args) {
    var inCart = args[0];
    var albums = [];
    for(var i=0; i < input.length; i++){
      if(input[i].inCart){
        albums.push(input[i]);
      }
    }
    return albums;
  }
}
