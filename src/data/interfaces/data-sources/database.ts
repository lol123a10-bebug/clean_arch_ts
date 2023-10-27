export interface Database {
  find(query: object): Promise<any[]>;
  insertOne(doc: any): Promise<any>;
}
