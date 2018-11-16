/* global HTMLElement */

const debug = require('debug')('bg-sound')
const Timidity = require('timidity')

const tmpl = document.createElement('template')
tmpl.innerHTML = `
  <style>:host { ... }</style> <!-- look ma, scoped styles -->
  <b>I'm in shadow dom!</b>
  <slot></slot>
`

class BgSound extends HTMLElement {
  static get observedAttributes () {
    return ['src']
  }

  constructor () {
    super()

    this._playingFired = false

    // Attach a shadow root to the element.
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(tmpl.content.cloneNode(true))

    this._onClick = this._onClick.bind(this)
  }

  connectedCallback () {
    document.addEventListener('click', this._onClick)

    if (!this.hasAttribute('baseUrl')) {
      this.setAttribute('baseUrl', '/')
    }

    this.player = new Timidity(this.baseUrl)

    this.player.on('playing', () => {
      this._playingFired = true
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

module.exports = BgSound
