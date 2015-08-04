module Rf.Base {
    /* 
     * リソース情報
    */
    export class Resource {
        public Keyword: string;
        public FileName: string;

        public constructor(keyword: string, fileName: string) {
            this.Keyword = keyword;
            this.FileName = fileName;
        }
    }

    /* 
     * リソース管理クラス
    */
    export class ResourceManager {
        resources: Array<Resource>;

        public ResourcePath: string;

        public constructor() {
            this.ResourcePath = "";
            this.resources = new Array<Resource>();
        }

        public AddGetResourceName(keyword: string, fileName: string): void {
            this.resources.push(new Resource(keyword, this.ResourcePath + fileName));
        }

        public GetResourceNames(): Array<string> {
            var result: Array<string> = new Array<string>();

            this.resources.forEach((value, index) => {
                result.push(value.FileName);
            });

            return result;
        }

        public GetResourceName(keyword: string): string {
            var result: string = "";

            this.resources.filter((value) => {
                if (value.Keyword === keyword) {
                    result = value.FileName;
                    return false;
                }
            });

            return result;
        }

    }

} 