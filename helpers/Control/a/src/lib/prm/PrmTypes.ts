import Playlist from "./playlist.svelte";
import Temp from "./temp.svelte";
import Url from "./url.svelte";

export let PrmTypes = {
  url: {
    comp: Url,
  },
  temp: {
    comp: Temp,
  },
  playlist:{
    comp:Playlist
  }
};
