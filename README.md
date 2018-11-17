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

## Talk

I introduced this project at JSConf Colombia 2018.

[![The Lost Art of MIDI talk](img/slide.png)](https://speakerdeck.com/feross/the-lost-art-of-midi-bringing-back-to-the-web)

## Demo

If you like this, then check out [BitMidi.com](https://bitmidi.com), the wayback machine for old-school MIDI files! Check out some examples MIDIs here:

- [Adele - Skyfall](https://bitmidi.com/adele-skyfall-mid)
- [Beatles - Imagine](https://bitmidi.com/beatles-imagine-mid)
- [Beyonce - Crazy in Love](https://bitmidi.com/beyonce-crazy-in-love-mid)
- [CANYON.MID](https://bitmidi.com/canyon-mid)
- [Cowboy Bepop - Space Lion](https://bitmidi.com/cowboy-bepop-space-lion-mid)
- [Eiffel 65 - Blue](https://bitmidi.com/dj-ali-eiffel-blue-mid)
- [Kingdom Hearts - Dearly Beloved](https://bitmidi.com/kingdom-hearts-dearly-beloved-mid)
- [Mario Bros. - Super Mario Bros. Theme](https://bitmidi.com/mario-bros-super-mario-bros-theme-mid)
- [Passenger - Let Her Go](https://bitmidi.com/passenger-let_her_go-mid)
- [Portal - Still Alive](https://bitmidi.com/portal-still-alive-mid)
- [Rick Astley - Never Gonna Give You Up](https://bitmidi.com/r-astley-never-gonna-give-you-up-k-mid)
- [Simpsons Theme Song](https://bitmidi.com/simpsons-mid)
- [Sonic the Hedgehog - Green Hill Zone](https://bitmidi.com/sonic-the-hedgehog-green-hill-zone-mid)
- [TOTO - Africa](https://bitmidi.com/toto-africa-k-mid)

## License

MIT. Copyright (c) [Feross Aboukhadijeh](https://feross.org).
