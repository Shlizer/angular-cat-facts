import { Injectable } from '@angular/core'

const JWT_KEY: string = 'token'

@Injectable()
export class JWT {
  save(token: string) {
    window.localStorage[JWT_KEY] = token
  }

  get() {
    return window.localStorage[JWT_KEY]
  }

  destroy() {
    window.localStorage.removeItem(JWT_KEY)
  }
}
