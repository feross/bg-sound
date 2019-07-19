/* global HTMLElement */

const debug = require('debug')('bg-sound')
const Timidity = require('timidity')
const insertCss = require('insert-css')
const whenDomReady = require('when-dom-ready')

class BgSound extends HTMLElement {
  static get observedAttributes () {
    return ['src', 'baseUrl', 'loop']
  }

  constructor () {
    super()

    this._playingFired = false
    this._onClick = this._onClick.bind(this)
    this._onPlaying = this._onPlaying.bind(this)
    this._onEnded = this._onEnded.bind(this)
  }

  connectedCallback () {
    document.addEventListener('click', this._onClick)

    if (!this.hasAttribute('baseUrl')) {
      this.setAttribute('baseUrl', 'https://bitmidi.com/timidity/')
    }

    if (!this.hasAttribute('loop')) {
      this.setAttribute('loop', 0)
    }

    this.playCount = 0
    this._initPlayer()
  }

  disconnectedCallback () {
    document.removeEventListener('click', this._onClick)
    this._destroyPlayer()
  }

  get src () {
    return this.getAttribute('src')
  }

  set src (val) {
    this.setAttribute('src', val)
  }

  get loop () {
    return this.getAttribute('loop')
  }

  set loop (val) {
    this.setAttribute('loop', val)
  }

  get baseUrl () {
    return this.getAttribute('baseUrl')
  }

  set baseUrl (val) {
    this.setAttribute('baseUrl', val)
  }

  attributeChangedCallback (name, oldValue, newValue) {
    debug(`${name} changed from ${oldValue} to ${newValue}`)
    if (name === 'src') {
      // TODO
      // if (oldValue != null) {
      //   this.player.pause()
      //   this.player.load(newValue)
      //   this.player.play()
      // }
    }
    if (name === 'baseUrl') {
      // TODO
    }
  }

  _initPlayer () {
    this.player = new Timidity(this.baseUrl)
    this.player.once('playing', this._onPlaying)
    this.player.once('ended', this._onEnded)
    this.player.load(this.src)
    this.player.play()
  }

  _destroyPlayer () {
    this.player.pause()
    this.player.destroy()
    this.player.removeListener('playing', this._onPlaying)
    this.player.removeListener('ended', this._onEnded)
    this.player = null
  }

  _onPlaying () {
    this._playingFired = true
  }

  _onEnded () {
    this._destroyPlayer()
    this.playCount += 1

    const loop = String(this.loop).toLowerCase()
    if (loop === 'infinite' || loop === 'true' || loop === '-1' ||
      Number(this.loop) > this.playCount) {
      this._initPlayer()
    }
  }

  _onClick () {
    if (!this._playingFired) this.player.play()
  }
}

window.customElements.define('bg-sound', BgSound)

function enableCompatMode (opts = {}) {
  insertCss(`
    embed {
      display: none;
    }
  `)

  whenDomReady().then(() => {
    const embeds = [
      ...document.querySelectorAll('embed'),
      ...document.querySelectorAll('bgsound')
    ]
    embeds.forEach(embed => {
      let src = embed.getAttribute('src')
      const loop = embed.getAttribute('loop')
      embed.remove()

      src = new URL(src, window.location.href).href
      console.log(src)

      if (!src) return

      if (src.endsWith('.mid') || src.endsWith('.midi')) {
        const bgSound = document.createElement('bg-sound')
        bgSound.setAttribute('src', src)
        if (loop) bgSound.setAttribute('loop', loop)
        if (opts.baseUrl) bgSound.setAttribute('baseUrl', opts.baseUrl)

        document.body.appendChild(bgSound)
      }

      if (src.endsWith('.wav')) {
        const audio = document.createElement('audio')
        audio.src = src
        audio.controls = false
        audio.autoplay = true
        if (loop && (loop.toLowerCase() === 'infinite' || loop === 'true' ||
            loop === '-1' || Number(loop) >= 2)) {
          audio.loop = true
        }

        let playingFired = false
        audio.addEventListener('playing', () => {
          playingFired = true
        })
        document.body.addEventListener('click', () => {
          if (!playingFired) audio.play()
        })
        document.body.appendChild(audio)
      }
    })
  })
}

module.exports = BgSound
module.exports.enableCompatMode = enableCompatMode
