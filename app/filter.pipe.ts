import { Pipe, PipeTransform } from 'angular2/core';
import { Album } from './album.model';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(input: Album[], args) {
    var desiredGenre = args[0];
    var desiredArtist = args[1];
    var albums = [];
    for (var i = 0; i < input.length; i++){
      if(desiredGenre === input[i].genre && desiredArtist === input[i].artist) {
        albums.push(input[i]);
      } else if((desiredGenre === input[i].genre && desiredArtist === "allArtists") || (desiredGenre === "allGenres" && desiredArtist === input[i].artist)) {
      albums.push(input[i]);
      } else if (desiredGenre === "allGenres" && desiredArtist === "allArtists") {
        return input;
      }
    }
    return albums;
  }
}
