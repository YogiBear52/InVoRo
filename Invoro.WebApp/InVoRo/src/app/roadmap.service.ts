import { Injectable } from '@angular/core';
import { Feature } from 'src/dataModel/Feature';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RoadmapService {
    private readonly ROADMAP_SERVICE_URL ="https://localhost:5001/api/Features"

    constructor(private http: HttpClient) {

    }

   public getFeatures(): Observable<Feature[]> {
        return this.http.get<Feature[]>(this.ROADMAP_SERVICE_URL)
    }
}