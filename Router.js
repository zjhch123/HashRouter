class Router {
  constructor(config) {
    this.config = config
    this.router = {}
    this.from = this.to = ''
    this.view()
  }

  get now() {
    return window.location.hash.substring(1)
  }

  register({
    path, beforeChange = () => {}, change = () => {}, afterChange = () => {}
  }) {
    this.router[path] = {
      beforeChange, afterChange, change
    }
  }

  go(path) {
    if (this.now === path) {
      this.render(this.router[this.now])
      return
    }
    window.location.hash = path
  }

  view() {
    this.config.forEach(item => {
      this.register(item)
    })

    window.addEventListener('hashchange', () => {
      this.render(this.router[this.now])
    })
  }

  render(obj) {
    if (typeof obj === 'undefined' || obj === null) {
      return
    }

    [this.from ,this.to] = [this.to, this.now];

    const ret = obj.beforeChange(this.from, this.to)
    if (ret === false) {
      return  
    }
    obj.change(this.from, this.to)
    obj.afterChange(this.from, this.to)
  }
}

export default Router
