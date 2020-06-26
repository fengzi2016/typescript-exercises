export class Database<T extends object> {
    protected filename: string;
    protected fullTextSearchFieldNames: (keyof T)[];
    protected record: Array<T>;
    constructor(filename: string, fullTextSearchFieldNames: string[]) {
        this.filename = filename;
        this.fullTextSearchFieldNames = fullTextSearchFieldNames;
      
        
        // 读入

    }

    async find(query: object): Promise<T[]> {
        return [];
    }

}
 