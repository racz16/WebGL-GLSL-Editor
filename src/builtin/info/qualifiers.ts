import { IQualifier } from "../interfaces";

export const qualifiers = new Map<string, Array<IQualifier>>([
  [
    "100",
    [
      {
        name: "precision",
        order: 10,
      },
      {
        name: "invariant",
        order: 10,
      },
      {
        name: "const",
        order: 30,
      },
      {
        name: "inout",
        order: 31,
      },
      {
        name: "in",
        order: 31,
      },
      {
        name: "out",
        order: 31,
      },
      {
        name: "uniform",
        order: 30,
      },
      {
        name: "varying",
        order: 31,
      },
      {
        name: "attribute",
        order: 31,
      },
      {
        name: "highp",
        order: 40,
      },
      {
        name: "mediump",
        order: 40,
      },
      {
        name: "lowp",
        order: 40,
      },
    ],
  ],
  [
    "300",
    [
      {
        name: "precision",
        order: 10,
      },
      {
        name: "layout",
        order: 10,
      },
      {
        name: "invariant",
        order: 10,
      },
      {
        name: "smooth",
        order: 20,
      },
      {
        name: "flat",
        order: 20,
      },
      {
        name: "const",
        order: 30,
      },
      {
        name: "inout",
        order: 31,
      },
      {
        name: "in",
        order: 31,
      },
      {
        name: "out",
        order: 31,
      },
      {
        name: "centroid",
        order: 30,
      },
      {
        name: "uniform",
        order: 30,
      },
      {
        name: "highp",
        order: 40,
      },
      {
        name: "mediump",
        order: 40,
      },
      {
        name: "lowp",
        order: 40,
      },
    ],
  ],
]);
