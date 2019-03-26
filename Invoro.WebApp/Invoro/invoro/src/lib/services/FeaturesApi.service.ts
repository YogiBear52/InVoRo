import Feature from "../dataModel/Feature";

export default class FeaturesApi {

  private FEATURES_API: string = 'https://localhost/api/Features';

  public async getFeatures(): Promise<Feature[]> {
    let response: Response = await fetch(this.FEATURES_API,{
      headers: {
        "Accept-Encoding": "gzip, deflate, br"
      }
    });

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    let responseData: any[] = await response.json();
    
    return (responseData as Feature[]).map<Feature>(feature => new Feature(feature.id,feature.name,feature.status));
  }
}