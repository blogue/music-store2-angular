import { Pipe, PipeTransform } from 'angular2/core';
import { Album } from './album.model';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {
  transform(input: Album[], args) {
    var sortByProperty = args[0];
    var albums = [];
    
    function comparePrice(a, b) {
      if (a.price < b.price)
      return -1;
      if (a.price > b.price)
      return 1;
      return 0;
      }
    function compareArtist(a, b) {
      if (a.artist < b.artist)
      return -1;
      if (a.artist > b.artist)
      return 1;
      return 0;
      }

    if (sortByProperty === "price") {
      return input.sort(comparePrice);
      } else if (sortByProperty === "artist") {
      return input.sort(compareArtist);
      }
    }
  }
