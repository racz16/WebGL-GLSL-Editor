import { IGenericType } from "../interfaces";

export const genericTypes = new Map<string, Array<IGenericType>>([
  [
    "100",
    [
      {
        generic: "genType",
        real: ["float", "vec2", "vec3", "vec4"],
      },
      {
        generic: "genIType",
        real: ["int", "ivec2", "ivec3", "ivec4"],
      },
      {
        generic: "genBType",
        real: ["bool", "bvec2", "bvec3", "bvec4"],
      },
      {
        generic: "vec",
        real: ["vec2", "vec3", "vec4"],
      },
      {
        generic: "ivec",
        real: ["ivec2", "ivec3", "ivec4"],
      },
      {
        generic: "bvec",
        real: ["bvec2", "bvec3", "bvec4"],
      },
      {
        generic: "gvec2",
        real: ["vec2", "ivec2"],
      },
      {
        generic: "gvec3",
        real: ["vec3", "ivec3"],
      },
      {
        generic: "gvec4",
        real: ["vec4", "ivec4"],
      },
      {
        generic: "mat",
        real: ["mat2", "mat3", "mat4"],
      },
    ],
  ],
  [
    "300",
    [
      {
        generic: "genType",
        real: ["float", "vec2", "vec3", "vec4"],
      },
      {
        generic: "genIType",
        real: ["int", "ivec2", "ivec3", "ivec4"],
      },
      {
        generic: "genUType",
        real: ["uint", "uvec2", "uvec3", "uvec4"],
      },
      {
        generic: "genBType",
        real: ["bool", "bvec2", "bvec3", "bvec4"],
      },
      {
        generic: "vec",
        real: ["vec2", "vec3", "vec4"],
      },
      {
        generic: "ivec",
        real: ["ivec2", "ivec3", "ivec4"],
      },
      {
        generic: "uvec",
        real: ["uvec2", "uvec3", "uvec4"],
      },
      {
        generic: "bvec",
        real: ["bvec2", "bvec3", "bvec4"],
      },
      {
        generic: "gvec2",
        real: ["vec2", "ivec2", "uvec2"],
      },
      {
        generic: "gvec3",
        real: ["vec3", "ivec3", "uvec3"],
      },
      {
        generic: "gvec4",
        real: ["vec4", "ivec4", "uvec4"],
      },
      {
        generic: "gsampler2D",
        real: ["sampler2D", "isampler2D", "usampler2D"],
      },
      {
        generic: "gsampler3D",
        real: ["sampler3D", "isampler3D", "usampler3D"],
      },
      {
        generic: "gsamplerCube",
        real: ["samplerCube", "isamplerCube", "usamplerCube"],
      },
      {
        generic: "gsampler2DArray",
        real: ["sampler2DArray", "isampler2DArray", "usampler2DArray"],
      },
      {
        generic: "mat",
        real: [
          "mat2",
          "mat3",
          "mat4",
          "mat2x2",
          "mat3x3",
          "mat4x4",
          "mat2x3",
          "mat3x2",
          "mat4x2",
          "mat2x4",
          "mat3x4",
          "mat4x3",
        ],
      },
    ],
  ],
]);
