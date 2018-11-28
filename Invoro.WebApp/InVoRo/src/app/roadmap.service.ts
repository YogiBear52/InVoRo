import { Injectable } from '@angular/core';
import { Feature } from 'src/dataModel/Feature';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RoadmapService {
    private readonly ROADMAP_SERVICE_URL ="localhost:5001"

    constructor(private http: HttpClient) {

    }

   getFeatures(): Observable<Feature[]> {
        return this.http.get<Feature[]>(this.ROADMAP_SERVICE_URL)
    }
}