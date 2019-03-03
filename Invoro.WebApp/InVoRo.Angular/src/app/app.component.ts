import { Component } from '@angular/core';
import { RoadmapService } from 'src/app/roadmap.service';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/internal/Subscription';
import { Feature } from 'src/dataModel/Feature';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [RoadmapService]
})
export class AppComponent implements OnInit {
  public title = 'InVoRo';
  public features: Observable<Feature[]>;

  constructor(private roadmapService: RoadmapService) {
  }
  
  public ngOnInit(){
    this.features = this.roadmapService.getFeatures();
  }
}
