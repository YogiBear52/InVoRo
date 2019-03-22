import { Feature } from "../dataModel/Feature";

export class FeaturesApi {

  private FEATURES_API: string = 'https://localhost/api/Features';

  public async getFeatures(): Promise<Feature[]> {
    let response: Response = await fetch(this.FEATURES_API);

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    let responseData: any[] = await response.json();
    return responseData.map<Feature>(feature => ({ id: feature.id, name: feature.name, status: feature.status }));
  }
}