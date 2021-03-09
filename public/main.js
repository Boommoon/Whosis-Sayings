/* global Vue */
(async () => {
  const gravatar = {
    Paul: { name: 'Paul', avatar: '0ac9ecaf2e88a82bfa212c7cc773cae1' }
  }
  const file = await fetch('public/saying.txt')
  const text = await file.text()
  const saying = text.split(';').slice(0, -1).map(x => x.trim())
  new Vue({ // eslint-disable-line no-new
    el: '#app',
    data: {
      saying: saying,
      uname: '',
      name: '',
      avatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000',
      message: ''
    },
    methods: {
      updateSaying () {
        const idx = Math.floor(Math.random() * this.saying.length)
        const saying = this.saying[idx].split(',')
        this.uname = saying[0]
        this.name = gravatar[this.uname].name
        this.avatar = `https://www.gravatar.com/avatar/${gravatar[this.uname].avatar}`
        this.message = saying[1]
      }
    },
    created () {
      (function f () {
        this.updateSaying()
        return setTimeout(f.bind(this), 5000)
      }).bind(this)()
    }
  })
})()
