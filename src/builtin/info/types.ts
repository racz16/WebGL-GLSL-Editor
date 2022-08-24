import { ICustomType, IOpaqueType, ITransparentType } from "../interfaces";

export const transparentTypes = new Map<string, Array<ITransparentType>>([
  [
    "100",
    [
      {
        name: "float",
        width: 1,
        height: 1,
        base: "float",
      },
      {
        name: "int",
        width: 1,
        height: 1,
        base: "int",
      },
      {
        name: "bool",
        width: 1,
        height: 1,
        base: "bool",
      },
      {
        name: "vec2",
        width: 2,
        height: 1,
        base: "float",
      },
      {
        name: "vec3",
        width: 3,
        height: 1,
        base: "float",
      },
      {
        name: "vec4",
        width: 4,
        height: 1,
        base: "float",
      },
      {
        name: "ivec2",
        width: 2,
        height: 1,
        base: "int",
      },
      {
        name: "ivec3",
        width: 3,
        height: 1,
        base: "int",
      },
      {
        name: "ivec4",
        width: 4,
        height: 1,
        base: "int",
      },
      {
        name: "bvec2",
        width: 2,
        height: 1,
        base: "bool",
      },
      {
        name: "bvec3",
        width: 3,
        height: 1,
        base: "bool",
      },
      {
        name: "bvec4",
        width: 4,
        height: 1,
        base: "bool",
      },
      {
        name: "mat2",
        width: 2,
        height: 2,
        base: "float",
      },
      {
        name: "mat3",
        width: 3,
        height: 3,
        base: "float",
      },
      {
        name: "mat4",
        width: 4,
        height: 4,
        base: "float",
      },
    ],
  ],
  [
    "300",
    [
      {
        name: "float",
        width: 1,
        height: 1,
        base: "float",
      },
      {
        name: "int",
        width: 1,
        height: 1,
        base: "int",
      },
      {
        name: "bool",
        width: 1,
        height: 1,
        base: "bool",
      },
      {
        name: "uint",
        width: 1,
        height: 1,
        base: "uint",
      },
      {
        name: "vec2",
        width: 2,
        height: 1,
        base: "float",
      },
      {
        name: "vec3",
        width: 3,
        height: 1,
        base: "float",
      },
      {
        name: "vec4",
        width: 4,
        height: 1,
        base: "float",
      },
      {
        name: "ivec2",
        width: 2,
        height: 1,
        base: "int",
      },
      {
        name: "ivec3",
        width: 3,
        height: 1,
        base: "int",
      },
      {
        name: "ivec4",
        width: 4,
        height: 1,
        base: "int",
      },
      {
        name: "bvec2",
        width: 2,
        height: 1,
        base: "bool",
      },
      {
        name: "bvec3",
        width: 3,
        height: 1,
        base: "bool",
      },
      {
        name: "bvec4",
        width: 4,
        height: 1,
        base: "bool",
      },
      {
        name: "uvec2",
        width: 2,
        height: 1,
        base: "uint",
      },
      {
        name: "uvec3",
        width: 3,
        height: 1,
        base: "uint",
      },
      {
        name: "uvec4",
        width: 4,
        height: 1,
        base: "uint",
      },
      {
        name: "mat2",
        width: 2,
        height: 2,
        base: "float",
      },
      {
        name: "mat3",
        width: 3,
        height: 3,
        base: "float",
      },
      {
        name: "mat4",
        width: 4,
        height: 4,
        base: "float",
      },
      {
        name: "mat2x2",
        width: 2,
        height: 2,
        base: "float",
        alias: "mat2",
      },
      {
        name: "mat2x3",
        width: 2,
        height: 3,
        base: "float",
      },
      {
        name: "mat2x4",
        width: 2,
        height: 4,
        base: "float",
      },
      {
        name: "mat3x2",
        width: 3,
        height: 2,
        base: "float",
      },
      {
        name: "mat3x3",
        width: 3,
        height: 3,
        base: "float",
        alias: "mat3",
      },
      {
        name: "mat3x4",
        width: 3,
        height: 4,
        base: "float",
      },
      {
        name: "mat4x2",
        width: 4,
        height: 2,
        base: "float",
      },
      {
        name: "mat4x3",
        width: 4,
        height: 3,
        base: "float",
      },
      {
        name: "mat4x4",
        width: 4,
        height: 4,
        base: "float",
        alias: "mat4",
      },
    ],
  ],
]);

export const floatingPointOpaqueTypes = new Map<string, Array<IOpaqueType>>([
  [
    "100",
    [
      {
        name: "sampler2D",
      },
      {
        name: "samplerCube",
      },
    ],
  ],
  [
    "300",
    [
      {
        name: "sampler2D",
      },
      {
        name: "sampler3D",
      },
      {
        name: "samplerCube",
      },
      {
        name: "samplerCubeShadow",
      },
      {
        name: "sampler2DShadow",
      },
      {
        name: "sampler2DArray",
      },
      {
        name: "sampler2DArrayShadow",
      },
    ],
  ],
]);
export const signedIntegerOpaqueTypes = new Map<string, Array<IOpaqueType>>([
  ["100", []],
  [
    "300",
    [
      {
        name: "isampler2D",
      },
      {
        name: "isampler3D",
      },
      {
        name: "isamplerCube",
      },
      {
        name: "isampler2DArray",
      },
    ],
  ],
]);
export const unsignedIntegerOpaqueTypes = new Map<string, Array<IOpaqueType>>([
  ["100", []],
  [
    "300",
    [
      {
        name: "usampler2D",
      },
      {
        name: "usampler3D",
      },
      {
        name: "usamplerCube",
      },
      {
        name: "usampler2DArray",
      },
    ],
  ],
]);
export const customTypes = new Map<string, Array<ICustomType>>([
  [
    "100",
    [
      {
        name: "gl_DepthRangeParameters",
        members: [
          {
            memberPrecision: "highp",
            memberType: "float",
            memberName: "near",
          },
          {
            memberPrecision: "highp",
            memberType: "float",
            memberName: "far",
          },
          {
            memberPrecision: "highp",
            memberType: "float",
            memberName: "diff",
          },
        ],
      },
    ],
  ],
  [
    "300",
    [
      {
        name: "gl_DepthRangeParameters",
        members: [
          {
            memberPrecision: "highp",
            memberType: "float",
            memberName: "near",
          },
          {
            memberPrecision: "highp",
            memberType: "float",
            memberName: "far",
          },
          {
            memberPrecision: "highp",
            memberType: "float",
            memberName: "diff",
          },
        ],
      },
    ],
  ],
]);
