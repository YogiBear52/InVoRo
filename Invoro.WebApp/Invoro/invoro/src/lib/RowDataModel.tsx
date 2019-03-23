export default class RowDataModel {
    
    id : number
    featureName : string
    col1 : string;
    col2 : string;
    col3 : string;
    col4 : string;
    col5 : string;
    
    constructor(id : number, featureName : string, col1 : string, col2 : string, col3 : string, col4 : string, col5 : string) {
        this.id = id;
        this.featureName = featureName;
        this.col1 = col1;
        this.col2 = col2;
        this.col3 = col3;
        this.col4 = col4;
        this.col5 = col5;
    }
}