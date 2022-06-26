import { HttpClient } from '@angular/common/http'
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'
import { MeowFact, MeowFactList } from '../models/meowFact.model'

const quoteUrl = 'https://meowfacts.herokuapp.com/'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('scrollParent')
  scrollParent?: ElementRef
  @ViewChild('scrollChild')
  scrollChild?: ElementRef

  quotes: MeowFact[] = []
  loading = false
  loadingThrottle = 200

  throttle = 50
  scrollDistance = 1

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    const interval = setInterval(async () => {
      await this.fetchQuote()
      const parentHeight = this.scrollParent?.nativeElement.offsetHeight
      const childHeight = this.scrollChild?.nativeElement.offsetHeight

      if (childHeight > parentHeight) {
        clearInterval(interval)
      }
    }, this.loadingThrottle)
  }

  onScroll() {
    if (!this.loading) {
      this.loading = true

      window.setTimeout(async () => {
        await this.fetchQuote()
        this.loading = false
      }, this.loadingThrottle)
    }
  }

  async fetchQuote(): Promise<void> {
    await this.http.get<MeowFactList>(quoteUrl).subscribe(({ data }) => {
      if (this.quotes.find(qoute => qoute === data[0])) {
        this.fetchQuote()
      } else {
        this.quotes.push(data[0])
      }
    })
  }
}
