import ac from 'audio-context'
import decodeArrayBuffer from './decode-array-buffer'

class Loader {
  constructor (sources) {
    this.names = Object.keys(sources)
    this.samples = {}
    this.names.forEach(name => {
      fetch("mp3/" + sources[name] + ".mp3")
      .then(decodeArrayBuffer())
      .then((buffer) => {
        this.samples[name] = buffer
      })
    })
  }
  get (name) {
    return this.samples[name]
  }
}

export default class Sampler {
  constructor (names) {
    this.samples = new Loader(names)
    this.sources = {}
  }
  start (name) {
    stop(name)
    const buffer = this.samples.get(name)
    if (buffer) {
      const source = ac.createBufferSource()
      source.buffer = buffer
      source.loop = true
      source.connect(ac.destination)
      source.start()
      this.sources[name] = source
    }
  }
  stop (name) {
    const source = this.sources[name]
    if (source) {
      source.stop()
      source.disconnect()
      this.sources[name] = null
    }
  }
}
