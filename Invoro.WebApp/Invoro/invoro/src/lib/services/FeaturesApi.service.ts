import Feature, { FeatureDTO } from "../dataModel/Feature";
import FeatureCategory from "../dataModel/FeaturesCategory";

export default class FeaturesApi {

  private FEATURES_API: string = 'https://localhost/api/Features';

  private headers: HeadersInit;
  constructor(private userIdentifier: string | null, private h: (input: RequestInfo, init?: RequestInit) => Promise<Response>) {
    this.headers = {
      "Accept-Encoding": "gzip, deflate, br"
    }

    if (this.userIdentifier != null) {
      this.headers.Authorization = this.userIdentifier;
    }
  }

  public async getFeatures(): Promise<FeatureCategory[]> {
    let response: Response = await this.h(this.FEATURES_API, {
      headers: this.headers
    });

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    let features: FeatureDTO[] = await this.GetFeaturesFromResponse(response);

    let categories: FeatureCategory[] = this.MapFeaturesDTOtoCategories(features);

    return categories;
  }


  private async GetFeaturesFromResponse(response: Response): Promise<FeatureDTO[]> {
    let responseData: any[] = await response.json();
    let features: FeatureDTO[] = this.convertJsonToTypedFeatures(responseData);

    // Validate DataModel 

    return features;
  }

  private convertJsonToTypedFeatures(featuresAsRawJson: any[]): FeatureDTO[] {
    return (featuresAsRawJson as FeatureDTO[])
      .map<FeatureDTO>(feature =>
        new FeatureDTO(feature.id, feature.name, feature.status, feature.link, feature.categoryName, new Date(feature.creationTime), new Date(feature.lastTimeModified)));
  }

  private MapFeaturesDTOtoCategories(features: FeatureDTO[]): FeatureCategory[] {
    let uniqueCategoryNames: Set<string> = this.getUniqueCategoryNames(features);
    let categories: FeatureCategory[] = this.MapCategoryToItsFeatures([...uniqueCategoryNames], features);

    return categories;
  }

  private getUniqueCategoryNames(features: FeatureDTO[]): Set<string> {
    let categoriesNames: string[] = features.map(feature => feature.categoryName);
    let uniqueCategoriesNames: Set<string> = new Set<string>(categoriesNames);

    return uniqueCategoriesNames;
  }

  private MapCategoryToItsFeatures(uniqueCategoryNames: string[], features: FeatureDTO[]): FeatureCategory[] {
    return uniqueCategoryNames.map(categoryName => {
      let categoryFeatures: Feature[] = features.filter(feature => feature.categoryName === categoryName);
      return new FeatureCategory(categoryName, categoryFeatures);
    });
  }
}