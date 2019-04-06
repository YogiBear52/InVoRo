import Feature from "../dataModel/Feature";

export default class FeaturesApi {

  private FEATURES_API: string = 'https://localhost/api/Features';

  private headers: HeadersInit;
  constructor(private userIdentifier : string) {
    this.headers = {
      "Accept-Encoding": "gzip, deflate, br"
    }

    if (this.userIdentifier){
      this.headers.Authorization = this.userIdentifier;
    }
  }

  public async getFeatures(): Promise<Feature[]> {
    let response: Response = await fetch(this.FEATURES_API, {
      headers: this.headers
    });

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    let responseData: any[] = await response.json();
    
    return (responseData as Feature[])
          .map<Feature>(feature => 
            new Feature(feature.id,feature.name,feature.status,feature.link,new Date(feature.creationTime),new Date(feature.lastTimeModified)));
  }
}