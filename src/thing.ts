import { ResponseObject } from "openapi-typescript";
const blah: ResponseObject = {
  description: "something",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          items: {
            type: "array",
            items: {
              type: "object",
              title: "Plan Recommendation",
              properties: {
                pk: { type: "string" },
                sk: { type: "string" },
                recId: { type: "string" },
                planName: { type: "string" },
                programKey: { type: "string" },
                pathwayId: { type: "string" },
                sequence: { type: "string" },
                courseIdOrGroup: { type: "string" },
                studentCount: { type: "number" },
                recommendationType: { type: "string" },
                campus: { type: "string" },
                modality: { type: "string" },
                timeOfDay: { type: "string" },
                completionTrackId: { type: "string" },
                ignoreFlag: { type: "boolean" },
                active: { type: "boolean" },
                lastUpdatedTime: { type: "string" },
              },
            },
          },
          next_token: { type: "string" },
        },
      },
    },
  },
};
