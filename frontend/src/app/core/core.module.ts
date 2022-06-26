import { NgModule, Optional, SkipSelf } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'

import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'
import { JWT } from './jwt'

@NgModule({
  imports: [HttpClientModule, RouterModule],
  providers: [AuthService, JWT, AuthGuard],
})
export class CoreModule {
  //Prevent reimport
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only')
    }
  }
}
