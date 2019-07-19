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
  }

  connectedCallback () {
    document.addEventListener('click', this._onClick)

    if (!this.hasAttribute('baseUrl')) {
      this.setAttribute('baseUrl', 'https://bitmidi.com/timidity/')
    }

    this.player = new Timidity(this.baseUrl)

    this.player.on('playing', () => {
      this._playingFired = true
    })
    
    this.playCount = 0
    this.player.on('ended', () => {
      this.playCount++
      
      if (this.hasAttribute('loop')) {
        if(this.loop === "infinite" || parseInt(this.loop) > this.playCount) {
          this.player.play()
        }
      }
    })

    this.player.load(this.src)
    this.player.play()
  }

  disconnectedCallback () {
    document.removeEventListener('click', this._onClick)
    this.player.pause()
    this.player.destroy()
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
    const embeds = Array.from(document.querySelectorAll('embed'))
    embeds.forEach(embed => {
      const src = embed.src
      embed.remove()

      const bgSound = document.createElement('bg-sound')
      bgSound.setAttribute('src', src)
      if (opts.baseUrl) bgSound.setAttribute('baseUrl', opts.baseUrl)

      document.body.appendChild(bgSound)
    })
  })
}

module.exports = BgSound
module.exports.enableCompatMode = enableCompatMode
