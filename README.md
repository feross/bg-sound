# bg-sound

[![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![javascript style guide][standard-image]][standard-url]

[travis-image]: https://img.shields.io/travis/feross/bg-sound/master.svg
[travis-url]: https://travis-ci.org/feross/bg-sound
[npm-image]: https://img.shields.io/npm/v/bg-sound.svg
[npm-url]: https://npmjs.org/package/bg-sound
[downloads-image]: https://img.shields.io/npm/dm/bg-sound.svg
[downloads-url]: https://npmjs.org/package/bg-sound
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-url]: https://standardjs.com

### Web Component to emulate the old-school `<bgsound>` HTML element

Play MIDI files in a browser with a simple Web Component.

## Install

```
npm install bg-sound timidity freepats
```

## Usage

```html
<script src="bg-sound.min.js"></script>
<bg-sound src="sound.mid"></bg-sound>
```

It's important to ensure that the `timidity` and `freepats` folders in `node_modules` are being served, as they contain the WebAssembly code and instrument sounds, respectively.

For example, here is how to mount the necessary files at `/` with the `express`
server:

```js
const timidityPath = path.dirname(require.resolve('timidity'))
app.use(express.static(timidityPath))

const freepatsPath = path.dirname(require.resolve('freepats'))
app.use(express.static(freepatsPath))
```

Optionally, provide a `baseUrl` attribute to customize where the player will
look for the lazy-loaded WebAssembly file `libtimidity.wasm` and the
[FreePats General MIDI soundset](https://www.npmjs.com/package/freepats) files.
The default `baseUrl` is `/`.

```js
<bg-sound src="sound.mid" baseUrl="/custom-path"></bg-sound>
```

## Demo

This package is used on [BitMidi.com](https://bitmidi.com), the wayback machine for old-school MIDI files! Check out some examples here:

- [Backstreet Boys - I Want It That Way MIDI](https://bitmidi.com/backstreet-boys-i-want-it-that-way-mid)
- [Beethoven Moonlight Sonata MIDI](https://bitmidi.com/beethoven-moonlight-sonata-mid)
- [Kingdom Hearts - Dearly Beloved MIDI](https://bitmidi.com/kingdom-hearts-dearly-beloved-mid)
- [Camptown Races MIDI](https://bitmidi.com/camptown-mid)
- [Michael Jackson - Billie Jean MIDI](https://bitmidi.com/michael-jackson-billie-jean-mid)
- [Michael Jackson - Don't Stop Till You Get Enough MIDI](https://bitmidi.com/michael-jackson-dont-stop-till-you-get-enough-mid)
- [Passenger - Let Her Go MIDI](https://bitmidi.com/passenger-let_her_go-mid)
- [Red Hot Chili Peppers - Otherside MIDI](https://bitmidi.com/red-hot-chili-peppers-otherside-mid)
- [Red Hot Chili Peppers - Californication MIDI](https://bitmidi.com/red-hot-chili-peppers-californication-mid)
- [Golden Sun - Overworld MIDI](https://bitmidi.com/golden-sun-overworld-mid)
- [Pokemon - Pokemon Center Theme MIDI](https://bitmidi.com/pokemon-pokemon-center-theme-mid)
- [Pokemon Red Blue Yellow - Opening MIDI](https://bitmidi.com/pokemon-redblueyellow-opening-yellow-mid)
- [Pokemon Red Blue Yellow - Wild Pokemon Battle MIDI](https://bitmidi.com/pokemon-redblueyellow-wild-pokemon-battle-mid)
- [Legend of Zelda - Overworld MIDI](https://bitmidi.com/legend-of-zelda-overworld-mid)

## License

MIT. Copyright (c) [Feross Aboukhadijeh](https://feross.org).
