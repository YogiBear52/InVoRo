import Feature from "./Feature"

export default class FeatureCategory {
    public name: string;
    public features: Feature[];

    public constructor(name: string, features: Feature[]) {
        this.name = name;
        this.features = [...features];
    }

    public static Compare(a: FeatureCategory, b: FeatureCategory): number {
        return a.name.localeCompare(b.name);
    }
}