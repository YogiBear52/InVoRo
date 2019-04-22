import Feature, { FeatureDTO } from "./Feature"

export default class FeatureCategory {
    public name: string;
    public features: Feature[];

    public constructor(name: string, features: Feature[]) {
        this.name = name;
        this.features = [...features];
    }
}