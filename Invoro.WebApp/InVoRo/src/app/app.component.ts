import { Component } from '@angular/core';
import { RoadmapService } from 'src/app/roadmap.service';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/internal/Subscription';
import { Feature } from 'src/dataModel/Feature';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [RoadmapService]
})
export class AppComponent implements OnInit {
  title = 'InVoRo';
  private features: Feature[];

  constructor(private roadmapService: RoadmapService) {
    
  }
  
  async ngOnInit(){

   let features: Feature[] = await this.roadmapService.getFeatures().toPromise();

   this.features = features;
  }
}
