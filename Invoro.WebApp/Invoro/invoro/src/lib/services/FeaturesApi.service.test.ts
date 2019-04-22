import FeaturesApi from "./FeaturesApi.service";
import FeatureCategory from "../dataModel/FeaturesCategory";
import Feature, { FeatureDTO } from "../dataModel/Feature";
import Status from "../dataModel/Status";

let fetchMock: jest.SpyInstance;

describe('FeaturesApi Service', () => {

    beforeEach(() => {
        if (fetchMock) {
            fetchMock.mockClear();
        }
    });

    describe('GetFeatures', () => {
        describe('Identity', () => {

            let feature: FeatureDTO;
            beforeEach(() => {
                feature = generateRandomFeature();
                MockFetchSuccessfullyWithFeatures([feature]);
            })

            describe('Has identity key', () => {

                let featuresApi: FeaturesApi;
                const identityProvided: string = "MyIdentity";
                beforeEach(() => {
                    featuresApi = new FeaturesApi(identityProvided, fetch);
                });

                it('Authorization Header is provided', async () => {
                    // Act
                    let data: FeatureCategory[] = await featuresApi.getFeatures();

                    // Assert
                    expect(fetchMock).toHaveBeenCalledTimes(1);
                    expect(fetchMock).toHaveBeenCalledWith(
                        expect.stringMatching(".*"),
                        { headers: expect.objectContaining({ Authorization: identityProvided }) });
                });

                it('Data received successfully ', async () => {
                    // Act
                    let data: FeatureCategory[] = await featuresApi.getFeatures();

                    // Assert
                    expect((<FeatureCategory>data.find(_ => _.name === feature.categoryName)).features).
                        toEqual([feature])
                });
            });

            describe('No identity key', () => {

                let featuresApi: FeaturesApi;
                beforeEach(() => {
                    featuresApi = new FeaturesApi(null, fetch);
                });

                it('Authorization Header is NOT provided', async () => {
                    // Act
                    let data: FeatureCategory[] = await featuresApi.getFeatures();

                    // Assert
                    expect(fetchMock).toHaveBeenCalledTimes(1);
                    expect(fetchMock).toHaveBeenCalledWith(
                        expect.stringMatching(".*"),
                        { headers: expect.not.objectContaining({ Authorization: expect.stringMatching(".*") }) });
                });

                it('Data received successfully ', async () => {
                    // Act
                    let data: FeatureCategory[] = await featuresApi.getFeatures();

                    // Assert
                    expect((<FeatureCategory>data.find(_ => _.name === feature.categoryName)).features).
                        toEqual([feature])
                });
            });
        });

        describe('Fetched json is NOT valid', () => {
            it('MISSING TESTS', () => {
            });
        });

        describe('Fetched json is valid', () => {
            let featuresApi: FeaturesApi;
            beforeEach(() => {
                featuresApi = new FeaturesApi("SomeIdentity", fetch);
            });

            describe('Raw json is Transformed to Object', () => {

                let featureCategories: FeatureCategory[];
                beforeEach(async () => {
                    let feature: FeatureDTO = generateRandomFeature();
                    MockFetchSuccessfullyWithFeatures([feature]);

                    // Act
                    featureCategories = await featuresApi.getFeatures();
                    expect(featureCategories).toHaveLength(1);
                });

                it('categories are transformed to objects', () => {
                    featureCategories.forEach(category =>
                        expect(category instanceof FeatureCategory))
                });

                it('features are transformed to objects', () => {
                    featureCategories.forEach(category =>
                        category.features.forEach(feature =>
                            expect(feature instanceof Feature)));
                });
            });

            describe('Order by categories', () => {
                it('One feature - one category', async () => {
                    // Prepare
                    let feature: FeatureDTO = generateRandomFeature();
                    MockFetchSuccessfullyWithFeatures([feature]);

                    // Act
                    let featureCategories: FeatureCategory[] = await featuresApi.getFeatures();

                    // Assert
                    expect(featureCategories).toHaveLength(1);
                    expect(featureCategories[0].features).toEqual([feature]);
                    expect(featureCategories[0].name).toBe(feature.categoryName);
                });
                it('Multiple features with different category', async () => {
                    // Prepare
                    let features: FeatureDTO[] = [generateRandomFeature('category1'), generateRandomFeature('category2')];
                    MockFetchSuccessfullyWithFeatures(features);

                    // Act
                    let featureCategories: FeatureCategory[] = await featuresApi.getFeatures();

                    // Assert
                    expect(featureCategories).toHaveLength(2);
                    expect(featureCategories.map(_ => _.name)).toEqual(["category1", "category2"]);
                    expect((featureCategories[0]).features).toEqual([features[0]]);
                    expect((featureCategories[1]).features).toEqual([features[1]]);
                });
                it('Multiple features with the same category', async () => {
                    // Prepare
                    let features: FeatureDTO[] = [generateRandomFeature('category'), generateRandomFeature('category')];
                    MockFetchSuccessfullyWithFeatures(features);

                    // Act
                    let featureCategories: FeatureCategory[] = await featuresApi.getFeatures();

                    // Assert
                    expect(featureCategories).toHaveLength(1);
                    expect(featureCategories[0].name === "category");
                    expect(featureCategories[0].features).toEqual(features);
                });
                it('Multiple features with same and different categories', async () => {
                    // Prepare
                    let features: FeatureDTO[] =
                        [generateRandomFeature('category1'), generateRandomFeature('category1'), generateRandomFeature('category2')];
                    MockFetchSuccessfullyWithFeatures(features);

                    // Act
                    let featureCategories: FeatureCategory[] = await featuresApi.getFeatures();

                    // Assert
                    expect(featureCategories).toHaveLength(2);
                    expect(featureCategories[0].name === "category1");
                    expect(featureCategories[1].name === "category2");
                    expect(featureCategories[0].features).toEqual([features[0], features[1]]);
                    expect(featureCategories[1].features).toEqual([features[2]]);
                });
            });
        });

    });
});

function MockFetchSuccessfullyWithFeatures(feature: FeatureDTO[]) {
    fetchMock = jest.spyOn(window, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify(feature))));
}

function generateRandomFeature(categoryName: string = "DefaultCategory"): FeatureDTO {
    return new FeatureDTO("1", "name", Status.InProgress, null, categoryName, new Date(), new Date());
}