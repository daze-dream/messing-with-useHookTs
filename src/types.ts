export type ApiResponseModel = {
  name: string;
  description: string;
  contentType: string;
  schema:
    | ApiResponseSchemaObject
    | ApiResponseSchemaArray
    | IApiResponseSchemaBase;
};

export interface IApiResponseSchemaBase {
  type: "object" | "array" | "string" | "number" | "boolean" | "binary";
  description?: string;
  title?: string;
}

export interface ApiResponseSchemaObject extends IApiResponseSchemaBase {
  properties: {
    [x: string]:
      | IApiResponseSchemaBase
      | ApiResponseSchemaArray
      | IApiResponseSchemaBase;
  };
}

export interface ApiResponseSchemaArray extends IApiResponseSchemaBase {
  items:
    | ApiResponseSchemaObject
    | ApiResponseSchemaArray
    | IApiResponseSchemaBase;
}

interface ObjectSchema {
    type: "object",
    properties: {
        [x: string]: 
    }
}