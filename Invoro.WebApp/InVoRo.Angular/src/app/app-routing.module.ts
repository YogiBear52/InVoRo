import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RoadmapService } from 'src/app/roadmap.service';

const routes: Routes = [];

@NgModule({
  imports:
   [
     RouterModule.forRoot(routes),
     HttpClientModule
    ],
  exports: [RouterModule],
  providers: [RoadmapService]
})
export class AppRoutingModule { }
