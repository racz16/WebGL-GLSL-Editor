import { IFunction } from '../interfaces';

export const functions = new Map<string, IFunction[]>([
    [
        '100',
        [
            {
                returnType: 'genType',
                name: 'acos',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'asin',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'atan',
                parameters: [
                    {
                        type: 'genType',
                        name: 'y',
                    },
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'atan',
                parameters: [
                    {
                        type: 'genType',
                        name: 'y_over_x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'cos',
                parameters: [
                    {
                        type: 'genType',
                        name: 'angle',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'degrees',
                parameters: [
                    {
                        type: 'genType',
                        name: 'radians',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'radians',
                parameters: [
                    {
                        type: 'genType',
                        name: 'degrees',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'sin',
                parameters: [
                    {
                        type: 'genType',
                        name: 'angle',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'tan',
                parameters: [
                    {
                        type: 'genType',
                        name: 'angle',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'abs',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'ceil',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'clamp',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'genType',
                        name: 'minVal',
                    },
                    {
                        type: 'genType',
                        name: 'maxVal',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'clamp',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'float',
                        name: 'minVal',
                    },
                    {
                        type: 'float',
                        name: 'maxVal',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'exp',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'exp2',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'floor',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'fract',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'inversesqrt',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'log',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'log2',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'max',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'genType',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'max',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'float',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'min',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'genType',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'min',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'float',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'mix',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'genType',
                        name: 'y',
                    },
                    {
                        type: 'genType',
                        name: 'a',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'mix',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'genType',
                        name: 'y',
                    },
                    {
                        type: 'float',
                        name: 'a',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'mod',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'float',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'mod',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'genType',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'pow',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'genType',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'sign',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'smoothstep',
                parameters: [
                    {
                        type: 'genType',
                        name: 'edge0',
                    },
                    {
                        type: 'genType',
                        name: 'edge1',
                    },
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'smoothstep',
                parameters: [
                    {
                        type: 'float',
                        name: 'edge0',
                    },
                    {
                        type: 'float',
                        name: 'edge1',
                    },
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'sqrt',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'step',
                parameters: [
                    {
                        type: 'genType',
                        name: 'edge',
                    },
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'step',
                parameters: [
                    {
                        type: 'float',
                        name: 'edge',
                    },
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'vec3',
                name: 'cross',
                parameters: [
                    {
                        type: 'vec3',
                        name: 'x',
                    },
                    {
                        type: 'vec3',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'distance',
                parameters: [
                    {
                        type: 'genType',
                        name: 'p0',
                    },
                    {
                        type: 'genType',
                        name: 'p1',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'dot',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'genType',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'equal',
                parameters: [
                    {
                        type: 'vec',
                        name: 'x',
                    },
                    {
                        type: 'vec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'equal',
                parameters: [
                    {
                        type: 'bvec',
                        name: 'x',
                    },
                    {
                        type: 'bvec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'equal',
                parameters: [
                    {
                        type: 'ivec',
                        name: 'x',
                    },
                    {
                        type: 'ivec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'faceforward',
                parameters: [
                    {
                        type: 'genType',
                        name: 'N',
                    },
                    {
                        type: 'genType',
                        name: 'I',
                    },
                    {
                        type: 'genType',
                        name: 'Nref',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'length',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'normalize',
                parameters: [
                    {
                        type: 'genType',
                        name: 'v',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'notEqual',
                parameters: [
                    {
                        type: 'vec',
                        name: 'x',
                    },
                    {
                        type: 'vec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'notEqual',
                parameters: [
                    {
                        type: 'ivec',
                        name: 'x',
                    },
                    {
                        type: 'ivec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'notEqual',
                parameters: [
                    {
                        type: 'bvec',
                        name: 'x',
                    },
                    {
                        type: 'bvec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'reflect',
                parameters: [
                    {
                        type: 'genType',
                        name: 'I',
                    },
                    {
                        type: 'genType',
                        name: 'N',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'refract',
                parameters: [
                    {
                        type: 'genType',
                        name: 'I',
                    },
                    {
                        type: 'genType',
                        name: 'N',
                    },
                    {
                        type: 'float',
                        name: 'eta',
                    },
                ],
            },
            {
                returnType: 'bool',
                name: 'all',
                parameters: [
                    {
                        type: 'bvec',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'bool',
                name: 'any',
                parameters: [
                    {
                        type: 'bvec',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'greaterThan',
                parameters: [
                    {
                        type: 'vec',
                        name: 'x',
                    },
                    {
                        type: 'vec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'greaterThan',
                parameters: [
                    {
                        type: 'ivec',
                        name: 'x',
                    },
                    {
                        type: 'ivec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'greaterThanEqual',
                parameters: [
                    {
                        type: 'vec',
                        name: 'x',
                    },
                    {
                        type: 'vec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'greaterThanEqual',
                parameters: [
                    {
                        type: 'ivec',
                        name: 'x',
                    },
                    {
                        type: 'ivec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'lessThan',
                parameters: [
                    {
                        type: 'vec',
                        name: 'x',
                    },
                    {
                        type: 'vec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'lessThan',
                parameters: [
                    {
                        type: 'ivec',
                        name: 'x',
                    },
                    {
                        type: 'ivec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'lessThanEqual',
                parameters: [
                    {
                        type: 'vec',
                        name: 'x',
                    },
                    {
                        type: 'vec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'lessThanEqual',
                parameters: [
                    {
                        type: 'ivec',
                        name: 'x',
                    },
                    {
                        type: 'ivec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'not',
                parameters: [
                    {
                        type: 'bvec',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'vec4',
                name: 'texture2D',
                parameters: [
                    {
                        type: 'sampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec2',
                        name: 'coord',
                    },
                ],
            },
            {
                returnType: 'vec4',
                name: 'texture2D',
                parameters: [
                    {
                        type: 'sampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec2',
                        name: 'coord',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                returnType: 'vec4',
                name: 'texture2DProj',
                parameters: [
                    {
                        type: 'sampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'coord',
                    },
                ],
            },
            {
                returnType: 'vec4',
                name: 'texture2DProj',
                parameters: [
                    {
                        type: 'sampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'coord',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                returnType: 'vec4',
                name: 'texture2DProj',
                parameters: [
                    {
                        type: 'sampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'coord',
                    },
                ],
            },
            {
                returnType: 'vec4',
                name: 'texture2DProj',
                parameters: [
                    {
                        type: 'sampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'coord',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                returnType: 'vec4',
                name: 'texture2DLod',
                parameters: [
                    {
                        type: 'sampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec2',
                        name: 'coord',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                ],
            },
            {
                returnType: 'vec4',
                name: 'texture2DProjLod',
                parameters: [
                    {
                        type: 'sampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec2',
                        name: 'coord',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                ],
            },
            {
                returnType: 'vec4',
                name: 'texture2DProjLod',
                parameters: [
                    {
                        type: 'sampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'coord',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                ],
            },
            {
                returnType: 'vec4',
                name: 'textureCube',
                parameters: [
                    {
                        type: 'samplerCube',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'coord',
                    },
                ],
            },
            {
                returnType: 'vec4',
                name: 'textureCube',
                parameters: [
                    {
                        type: 'samplerCube',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'coord',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                returnType: 'vec4',
                name: 'textureCubeLod',
                parameters: [
                    {
                        type: 'samplerCube',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'coord',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                ],
            },
            {
                returnType: 'mat',
                name: 'matrixCompMult',
                parameters: [
                    {
                        type: 'mat',
                        name: 'x',
                    },
                    {
                        type: 'mat',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'fwidth',
                parameters: [
                    {
                        type: 'genType',
                        name: 'p',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_OES_standard_derivatives',
            },
            {
                returnType: 'genType',
                name: 'dFdx',
                parameters: [
                    {
                        type: 'genType',
                        name: 'p',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_OES_standard_derivatives',
            },
            {
                returnType: 'genType',
                name: 'dFdy',
                parameters: [
                    {
                        type: 'genType',
                        name: 'p',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_OES_standard_derivatives',
            },
            {
                returnType: 'vec4',
                name: 'texture2DLodEXT',
                parameters: [
                    {
                        type: 'sampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec2',
                        name: 'coord',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                returnType: 'vec4',
                name: 'texture2DProjLodEXT',
                parameters: [
                    {
                        type: 'sampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'coord',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                returnType: 'vec4',
                name: 'texture2DProjLodEXT',
                parameters: [
                    {
                        type: 'sampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'coord',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                returnType: 'vec4',
                name: 'textureCubeLodEXT',
                parameters: [
                    {
                        type: 'samplerCube',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'coord',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                returnType: 'vec4',
                name: 'texture2DGradEXT',
                parameters: [
                    {
                        type: 'sampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec2',
                        name: 'P',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdy',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                returnType: 'vec4',
                name: 'texture2DProjGradEXT',
                parameters: [
                    {
                        type: 'sampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdy',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                returnType: 'vec4',
                name: 'texture2DProjGradEXT',
                parameters: [
                    {
                        type: 'sampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdy',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                returnType: 'vec4',
                name: 'textureCubeGradEXT',
                parameters: [
                    {
                        type: 'samplerCube',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'vec3',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec3',
                        name: 'dPdy',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
        ],
    ],
    [
        '300',
        [
            {
                returnType: 'genType',
                name: 'acos',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'acosh',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'asin',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'asinh',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'atan',
                parameters: [
                    {
                        type: 'genType',
                        name: 'y',
                    },
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'atan',
                parameters: [
                    {
                        type: 'genType',
                        name: 'y_over_x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'atanh',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'cos',
                parameters: [
                    {
                        type: 'genType',
                        name: 'angle',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'cosh',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'degrees',
                parameters: [
                    {
                        type: 'genType',
                        name: 'radians',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'radians',
                parameters: [
                    {
                        type: 'genType',
                        name: 'degrees',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'sin',
                parameters: [
                    {
                        type: 'genType',
                        name: 'angle',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'sinh',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'tan',
                parameters: [
                    {
                        type: 'genType',
                        name: 'angle',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'tanh',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'abs',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genIType',
                name: 'abs',
                parameters: [
                    {
                        type: 'genIType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'ceil',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'clamp',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'genType',
                        name: 'minVal',
                    },
                    {
                        type: 'genType',
                        name: 'maxVal',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'clamp',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'float',
                        name: 'minVal',
                    },
                    {
                        type: 'float',
                        name: 'maxVal',
                    },
                ],
            },
            {
                returnType: 'genIType',
                name: 'clamp',
                parameters: [
                    {
                        type: 'genIType',
                        name: 'x',
                    },
                    {
                        type: 'genIType',
                        name: 'minVal',
                    },
                    {
                        type: 'genIType',
                        name: 'maxVal',
                    },
                ],
            },
            {
                returnType: 'genIType',
                name: 'clamp',
                parameters: [
                    {
                        type: 'genIType',
                        name: 'x',
                    },
                    {
                        type: 'int',
                        name: 'minVal',
                    },
                    {
                        type: 'int',
                        name: 'maxVal',
                    },
                ],
            },
            {
                returnType: 'genUType',
                name: 'clamp',
                parameters: [
                    {
                        type: 'genUType',
                        name: 'x',
                    },
                    {
                        type: 'genUType',
                        name: 'minVal',
                    },
                    {
                        type: 'genUType',
                        name: 'maxVal',
                    },
                ],
            },
            {
                returnType: 'genUType',
                name: 'clamp',
                parameters: [
                    {
                        type: 'genUType',
                        name: 'x',
                    },
                    {
                        type: 'uint',
                        name: 'minVal',
                    },
                    {
                        type: 'uint',
                        name: 'maxVal',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'dFdx',
                parameters: [
                    {
                        type: 'genType',
                        name: 'p',
                    },
                ],
                stage: 'fragment',
            },
            {
                returnType: 'genType',
                name: 'dFdy',
                parameters: [
                    {
                        type: 'genType',
                        name: 'p',
                    },
                ],
                stage: 'fragment',
            },
            {
                returnType: 'genType',
                name: 'exp',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'exp2',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'floor',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'fract',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'fwidth',
                parameters: [
                    {
                        type: 'genType',
                        name: 'p',
                    },
                ],
                stage: 'fragment',
            },
            {
                returnType: 'genType',
                name: 'inversesqrt',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genBType',
                name: 'isinf',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genBType',
                name: 'isnan',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'log',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'log2',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'max',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'genType',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'max',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'float',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genIType',
                name: 'max',
                parameters: [
                    {
                        type: 'genIType',
                        name: 'x',
                    },
                    {
                        type: 'genIType',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genIType',
                name: 'max',
                parameters: [
                    {
                        type: 'genIType',
                        name: 'x',
                    },
                    {
                        type: 'int',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genUType',
                name: 'max',
                parameters: [
                    {
                        type: 'genUType',
                        name: 'x',
                    },
                    {
                        type: 'genUType',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genUType',
                name: 'max',
                parameters: [
                    {
                        type: 'genUType',
                        name: 'x',
                    },
                    {
                        type: 'uint',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'min',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'genType',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'min',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'float',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genIType',
                name: 'min',
                parameters: [
                    {
                        type: 'genIType',
                        name: 'x',
                    },
                    {
                        type: 'genIType',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genIType',
                name: 'min',
                parameters: [
                    {
                        type: 'genIType',
                        name: 'x',
                    },
                    {
                        type: 'int',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genUType',
                name: 'min',
                parameters: [
                    {
                        type: 'genUType',
                        name: 'x',
                    },
                    {
                        type: 'genUType',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genUType',
                name: 'min',
                parameters: [
                    {
                        type: 'genUType',
                        name: 'x',
                    },
                    {
                        type: 'uint',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'mix',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'genType',
                        name: 'y',
                    },
                    {
                        type: 'genType',
                        name: 'a',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'mix',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'genType',
                        name: 'y',
                    },
                    {
                        type: 'float',
                        name: 'a',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'mix',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'genType',
                        name: 'y',
                    },
                    {
                        type: 'genBType',
                        name: 'a',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'mod',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'float',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'mod',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'genType',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'modf',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'genType',
                        name: 'i',
                        qualifiers: ['out'],
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'pow',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'genType',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'round',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'roundEven',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'sign',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genIType',
                name: 'sign',
                parameters: [
                    {
                        type: 'genIType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'smoothstep',
                parameters: [
                    {
                        type: 'genType',
                        name: 'edge0',
                    },
                    {
                        type: 'genType',
                        name: 'edge1',
                    },
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'smoothstep',
                parameters: [
                    {
                        type: 'float',
                        name: 'edge0',
                    },
                    {
                        type: 'float',
                        name: 'edge1',
                    },
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'sqrt',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'step',
                parameters: [
                    {
                        type: 'genType',
                        name: 'edge',
                    },
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'step',
                parameters: [
                    {
                        type: 'float',
                        name: 'edge',
                    },
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'trunc',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genIType',
                name: 'floatBitsToInt',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genUType',
                name: 'floatBitsToUint',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'intBitsToFloat',
                parameters: [
                    {
                        type: 'genIType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'uintBitsToFloat',
                parameters: [
                    {
                        type: 'genUType',
                        name: 'x',
                    },
                ],
            },
            {
                qualifiers: ['highp'],
                returnType: 'uint',
                name: 'packHalf2x16',
                parameters: [
                    {
                        qualifiers: ['mediump'],
                        type: 'vec2',
                        name: 'v',
                    },
                ],
            },
            {
                qualifiers: ['highp'],
                returnType: 'uint',
                name: 'packUnorm2x16',
                parameters: [
                    {
                        type: 'vec2',
                        name: 'v',
                    },
                ],
            },
            {
                qualifiers: ['highp'],
                returnType: 'uint',
                name: 'packSnorm2x16',
                parameters: [
                    {
                        type: 'vec2',
                        name: 'v',
                    },
                ],
            },
            {
                qualifiers: ['mediump'],
                returnType: 'vec2',
                name: 'unpackHalf2x16',
                parameters: [
                    {
                        qualifiers: ['highp'],
                        type: 'uint',
                        name: 'v',
                    },
                ],
            },
            {
                qualifiers: ['highp'],
                returnType: 'vec2',
                name: 'unpackUnorm2x16',
                parameters: [
                    {
                        qualifiers: ['highp'],
                        type: 'uint',
                        name: 'p',
                    },
                ],
            },
            {
                qualifiers: ['highp'],
                returnType: 'vec2',
                name: 'unpackSnorm2x16',
                parameters: [
                    {
                        qualifiers: ['highp'],
                        type: 'uint',
                        name: 'p',
                    },
                ],
            },
            {
                returnType: 'vec3',
                name: 'cross',
                parameters: [
                    {
                        type: 'vec3',
                        name: 'x',
                    },
                    {
                        type: 'vec3',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'distance',
                parameters: [
                    {
                        type: 'genType',
                        name: 'p0',
                    },
                    {
                        type: 'genType',
                        name: 'p1',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'dot',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                    {
                        type: 'genType',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'equal',
                parameters: [
                    {
                        type: 'vec',
                        name: 'x',
                    },
                    {
                        type: 'vec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'equal',
                parameters: [
                    {
                        type: 'bvec',
                        name: 'x',
                    },
                    {
                        type: 'bvec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'equal',
                parameters: [
                    {
                        type: 'ivec',
                        name: 'x',
                    },
                    {
                        type: 'ivec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'equal',
                parameters: [
                    {
                        type: 'uvec',
                        name: 'x',
                    },
                    {
                        type: 'uvec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'faceforward',
                parameters: [
                    {
                        type: 'genType',
                        name: 'N',
                    },
                    {
                        type: 'genType',
                        name: 'I',
                    },
                    {
                        type: 'genType',
                        name: 'Nref',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'length',
                parameters: [
                    {
                        type: 'genType',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'normalize',
                parameters: [
                    {
                        type: 'genType',
                        name: 'v',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'notEqual',
                parameters: [
                    {
                        type: 'vec',
                        name: 'x',
                    },
                    {
                        type: 'vec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'notEqual',
                parameters: [
                    {
                        type: 'ivec',
                        name: 'x',
                    },
                    {
                        type: 'ivec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'notEqual',
                parameters: [
                    {
                        type: 'bvec',
                        name: 'x',
                    },
                    {
                        type: 'bvec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'notEqual',
                parameters: [
                    {
                        type: 'uvec',
                        name: 'x',
                    },
                    {
                        type: 'uvec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'reflect',
                parameters: [
                    {
                        type: 'genType',
                        name: 'I',
                    },
                    {
                        type: 'genType',
                        name: 'N',
                    },
                ],
            },
            {
                returnType: 'genType',
                name: 'refract',
                parameters: [
                    {
                        type: 'genType',
                        name: 'I',
                    },
                    {
                        type: 'genType',
                        name: 'N',
                    },
                    {
                        type: 'float',
                        name: 'eta',
                    },
                ],
            },
            {
                returnType: 'bool',
                name: 'all',
                parameters: [
                    {
                        type: 'bvec',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'bool',
                name: 'any',
                parameters: [
                    {
                        type: 'bvec',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'greaterThan',
                parameters: [
                    {
                        type: 'vec',
                        name: 'x',
                    },
                    {
                        type: 'vec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'greaterThan',
                parameters: [
                    {
                        type: 'ivec',
                        name: 'x',
                    },
                    {
                        type: 'ivec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'greaterThan',
                parameters: [
                    {
                        type: 'uvec',
                        name: 'x',
                    },
                    {
                        type: 'uvec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'greaterThanEqual',
                parameters: [
                    {
                        type: 'vec',
                        name: 'x',
                    },
                    {
                        type: 'vec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'greaterThanEqual',
                parameters: [
                    {
                        type: 'ivec',
                        name: 'x',
                    },
                    {
                        type: 'ivec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'greaterThanEqual',
                parameters: [
                    {
                        type: 'uvec',
                        name: 'x',
                    },
                    {
                        type: 'uvec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'lessThan',
                parameters: [
                    {
                        type: 'vec',
                        name: 'x',
                    },
                    {
                        type: 'vec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'lessThan',
                parameters: [
                    {
                        type: 'ivec',
                        name: 'x',
                    },
                    {
                        type: 'ivec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'lessThan',
                parameters: [
                    {
                        type: 'uvec',
                        name: 'x',
                    },
                    {
                        type: 'uvec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'lessThanEqual',
                parameters: [
                    {
                        type: 'vec',
                        name: 'x',
                    },
                    {
                        type: 'vec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'lessThanEqual',
                parameters: [
                    {
                        type: 'ivec',
                        name: 'x',
                    },
                    {
                        type: 'ivec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'lessThanEqual',
                parameters: [
                    {
                        type: 'uvec',
                        name: 'x',
                    },
                    {
                        type: 'uvec',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'bvec',
                name: 'not',
                parameters: [
                    {
                        type: 'bvec',
                        name: 'x',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'texelFetch',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'ivec2',
                        name: 'P',
                    },
                    {
                        type: 'int',
                        name: 'lod',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'texelFetch',
                parameters: [
                    {
                        type: 'gsampler3D',
                        name: 'sampler',
                    },
                    {
                        type: 'ivec3',
                        name: 'P',
                    },
                    {
                        type: 'int',
                        name: 'lod',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'texelFetch',
                parameters: [
                    {
                        type: 'gsampler2DArray',
                        name: 'sampler',
                    },
                    {
                        type: 'ivec3',
                        name: 'P',
                    },
                    {
                        type: 'int',
                        name: 'lod',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'texelFetchOffset',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'ivec2',
                        name: 'P',
                    },
                    {
                        type: 'int',
                        name: 'lod',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'texelFetchOffset',
                parameters: [
                    {
                        type: 'gsampler3D',
                        name: 'sampler',
                    },
                    {
                        type: 'ivec3',
                        name: 'P',
                    },
                    {
                        type: 'int',
                        name: 'lod',
                    },
                    {
                        type: 'ivec3',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'texelFetchOffset',
                parameters: [
                    {
                        type: 'gsampler2DArray',
                        name: 'sampler',
                    },
                    {
                        type: 'ivec3',
                        name: 'P',
                    },
                    {
                        type: 'int',
                        name: 'lod',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'texture',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec2',
                        name: 'P',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'texture',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec2',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'texture',
                parameters: [
                    {
                        type: 'gsampler3D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'texture',
                parameters: [
                    {
                        type: 'gsampler3D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'texture',
                parameters: [
                    {
                        type: 'gsamplerCube',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'texture',
                parameters: [
                    {
                        type: 'gsamplerCube',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'texture',
                parameters: [
                    {
                        type: 'sampler2DShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'texture',
                parameters: [
                    {
                        type: 'sampler2DShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'texture',
                parameters: [
                    {
                        type: 'samplerCubeShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'texture',
                parameters: [
                    {
                        type: 'samplerCubeShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'texture',
                parameters: [
                    {
                        type: 'gsampler2DArray',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'texture',
                parameters: [
                    {
                        type: 'gsampler2DArray',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'texture',
                parameters: [
                    {
                        type: 'sampler2DArrayShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureGrad',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec2',
                        name: 'P',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdy',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureGrad',
                parameters: [
                    {
                        type: 'gsampler3D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'vec3',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec3',
                        name: 'dPdy',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureGrad',
                parameters: [
                    {
                        type: 'gsamplerCube',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'vec3',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec3',
                        name: 'dPdy',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'textureGrad',
                parameters: [
                    {
                        type: 'sampler2DShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdy',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'textureGrad',
                parameters: [
                    {
                        type: 'samplerCubeShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'vec3',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec3',
                        name: 'dPdy',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureGrad',
                parameters: [
                    {
                        type: 'gsampler2DArray',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdy',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'textureGrad',
                parameters: [
                    {
                        type: 'sampler2DArrayShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdy',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureGradOffset',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec2',
                        name: 'P',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdy',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureGradOffset',
                parameters: [
                    {
                        type: 'gsampler3D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'vec3',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec3',
                        name: 'dPdy',
                    },
                    {
                        type: 'ivec3',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'textureGradOffset',
                parameters: [
                    {
                        type: 'sampler2DShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdy',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureGradOffset',
                parameters: [
                    {
                        type: 'gsampler2DArray',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdy',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'textureGradOffset',
                parameters: [
                    {
                        type: 'sampler2DArrayShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdy',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureLod',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec2',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureLod',
                parameters: [
                    {
                        type: 'gsampler3D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureLod',
                parameters: [
                    {
                        type: 'gsamplerCube',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'textureLod',
                parameters: [
                    {
                        type: 'sampler2DShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureLod',
                parameters: [
                    {
                        type: 'gsampler2DArray',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureLodOffset',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec2',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureLodOffset',
                parameters: [
                    {
                        type: 'gsampler3D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                    {
                        type: 'ivec3',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'textureLodOffset',
                parameters: [
                    {
                        type: 'sampler2DShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureLodOffset',
                parameters: [
                    {
                        type: 'gsampler2DArray',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureOffset',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec2',
                        name: 'P',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureOffset',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec2',
                        name: 'P',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureOffset',
                parameters: [
                    {
                        type: 'gsampler3D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'ivec3',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureOffset',
                parameters: [
                    {
                        type: 'gsampler3D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'ivec3',
                        name: 'offset',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'textureOffset',
                parameters: [
                    {
                        type: 'sampler2DShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'textureOffset',
                parameters: [
                    {
                        type: 'sampler2DShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureOffset',
                parameters: [
                    {
                        type: 'gsampler2DArray',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureOffset',
                parameters: [
                    {
                        type: 'gsampler2DArray',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProj',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProj',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProj',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProj',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProj',
                parameters: [
                    {
                        type: 'gsampler3D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProj',
                parameters: [
                    {
                        type: 'gsampler3D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'textureProj',
                parameters: [
                    {
                        type: 'sampler2DShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'textureProj',
                parameters: [
                    {
                        type: 'sampler2DShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProjGrad',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdy',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProjGrad',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdy',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProjGrad',
                parameters: [
                    {
                        type: 'gsampler3D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'vec3',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec3',
                        name: 'dPdy',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'textureProjGrad',
                parameters: [
                    {
                        type: 'sampler2DShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdy',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProjGradOffset',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdy',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProjGradOffset',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdy',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProjGradOffset',
                parameters: [
                    {
                        type: 'gsampler3D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'vec3',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec3',
                        name: 'dPdy',
                    },
                    {
                        type: 'ivec3',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'textureProjGradOffset',
                parameters: [
                    {
                        type: 'sampler2DShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdy',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProjLod',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProjLod',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProjLod',
                parameters: [
                    {
                        type: 'gsampler3D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'textureProjLod',
                parameters: [
                    {
                        type: 'sampler2DShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProjLodOffset',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProjLodOffset',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProjLodOffset',
                parameters: [
                    {
                        type: 'gsampler3D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                    {
                        type: 'ivec3',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'textureProjLodOffset',
                parameters: [
                    {
                        type: 'sampler2DShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProjOffset',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProjOffset',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProjOffset',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProjOffset',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProjOffset',
                parameters: [
                    {
                        type: 'gsampler3D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'ivec3',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'gvec4',
                name: 'textureProjOffset',
                parameters: [
                    {
                        type: 'gsampler3D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'ivec3',
                        name: 'offset',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'textureProjOffset',
                parameters: [
                    {
                        type: 'sampler2DShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'textureProjOffset',
                parameters: [
                    {
                        type: 'sampler2DShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'ivec2',
                        name: 'offset',
                    },
                    {
                        type: 'float',
                        name: 'bias',
                    },
                ],
            },
            {
                qualifiers: ['highp'],
                returnType: 'ivec2',
                name: 'textureSize',
                parameters: [
                    {
                        type: 'gsampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'int',
                        name: 'lod',
                    },
                ],
            },
            {
                qualifiers: ['highp'],
                returnType: 'ivec3',
                name: 'textureSize',
                parameters: [
                    {
                        type: 'gsampler3D',
                        name: 'sampler',
                    },
                    {
                        type: 'int',
                        name: 'lod',
                    },
                ],
            },
            {
                qualifiers: ['highp'],
                returnType: 'ivec2',
                name: 'textureSize',
                parameters: [
                    {
                        type: 'gsamplerCube',
                        name: 'sampler',
                    },
                    {
                        type: 'int',
                        name: 'lod',
                    },
                ],
            },
            {
                qualifiers: ['highp'],
                returnType: 'ivec2',
                name: 'textureSize',
                parameters: [
                    {
                        type: 'sampler2DShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'int',
                        name: 'lod',
                    },
                ],
            },
            {
                qualifiers: ['highp'],
                returnType: 'ivec2',
                name: 'textureSize',
                parameters: [
                    {
                        type: 'samplerCubeShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'int',
                        name: 'lod',
                    },
                ],
            },
            {
                qualifiers: ['highp'],
                returnType: 'ivec3',
                name: 'textureSize',
                parameters: [
                    {
                        type: 'gsampler2DArray',
                        name: 'sampler',
                    },
                    {
                        type: 'int',
                        name: 'lod',
                    },
                ],
            },
            {
                qualifiers: ['highp'],
                returnType: 'ivec3',
                name: 'textureSize',
                parameters: [
                    {
                        type: 'sampler2DArrayShadow',
                        name: 'sampler',
                    },
                    {
                        type: 'int',
                        name: 'lod',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'determinant',
                parameters: [
                    {
                        type: 'mat2',
                        name: 'm',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'determinant',
                parameters: [
                    {
                        type: 'mat3',
                        name: 'm',
                    },
                ],
            },
            {
                returnType: 'float',
                name: 'determinant',
                parameters: [
                    {
                        type: 'mat4',
                        name: 'm',
                    },
                ],
            },
            {
                returnType: 'mat2',
                name: 'inverse',
                parameters: [
                    {
                        type: 'mat2',
                        name: 'm',
                    },
                ],
            },
            {
                returnType: 'mat3',
                name: 'inverse',
                parameters: [
                    {
                        type: 'mat3',
                        name: 'm',
                    },
                ],
            },
            {
                returnType: 'mat4',
                name: 'inverse',
                parameters: [
                    {
                        type: 'mat4',
                        name: 'm',
                    },
                ],
            },
            {
                returnType: 'mat',
                name: 'matrixCompMult',
                parameters: [
                    {
                        type: 'mat',
                        name: 'x',
                    },
                    {
                        type: 'mat',
                        name: 'y',
                    },
                ],
            },
            {
                returnType: 'mat2',
                name: 'outerProduct',
                parameters: [
                    {
                        type: 'vec2',
                        name: 'c',
                    },
                    {
                        type: 'vec2',
                        name: 'r',
                    },
                ],
            },
            {
                returnType: 'mat3',
                name: 'outerProduct',
                parameters: [
                    {
                        type: 'vec3',
                        name: 'c',
                    },
                    {
                        type: 'vec3',
                        name: 'r',
                    },
                ],
            },
            {
                returnType: 'mat4',
                name: 'outerProduct',
                parameters: [
                    {
                        type: 'vec4',
                        name: 'c',
                    },
                    {
                        type: 'vec4',
                        name: 'r',
                    },
                ],
            },
            {
                returnType: 'mat2x3',
                name: 'outerProduct',
                parameters: [
                    {
                        type: 'vec3',
                        name: 'c',
                    },
                    {
                        type: 'vec2',
                        name: 'r',
                    },
                ],
            },
            {
                returnType: 'mat3x2',
                name: 'outerProduct',
                parameters: [
                    {
                        type: 'vec2',
                        name: 'c',
                    },
                    {
                        type: 'vec3',
                        name: 'r',
                    },
                ],
            },
            {
                returnType: 'mat2x4',
                name: 'outerProduct',
                parameters: [
                    {
                        type: 'vec4',
                        name: 'c',
                    },
                    {
                        type: 'vec2',
                        name: 'r',
                    },
                ],
            },
            {
                returnType: 'mat4x2',
                name: 'outerProduct',
                parameters: [
                    {
                        type: 'vec2',
                        name: 'c',
                    },
                    {
                        type: 'vec4',
                        name: 'r',
                    },
                ],
            },
            {
                returnType: 'mat3x4',
                name: 'outerProduct',
                parameters: [
                    {
                        type: 'vec4',
                        name: 'c',
                    },
                    {
                        type: 'vec3',
                        name: 'r',
                    },
                ],
            },
            {
                returnType: 'mat4x3',
                name: 'outerProduct',
                parameters: [
                    {
                        type: 'vec3',
                        name: 'c',
                    },
                    {
                        type: 'vec4',
                        name: 'r',
                    },
                ],
            },
            {
                returnType: 'mat2',
                name: 'transpose',
                parameters: [
                    {
                        type: 'mat2',
                        name: 'm',
                    },
                ],
            },
            {
                returnType: 'mat3',
                name: 'transpose',
                parameters: [
                    {
                        type: 'mat3',
                        name: 'm',
                    },
                ],
            },
            {
                returnType: 'mat4',
                name: 'transpose',
                parameters: [
                    {
                        type: 'mat4',
                        name: 'm',
                    },
                ],
            },
            {
                returnType: 'mat2x3',
                name: 'transpose',
                parameters: [
                    {
                        type: 'mat3x2',
                        name: 'm',
                    },
                ],
            },
            {
                returnType: 'mat2x4',
                name: 'transpose',
                parameters: [
                    {
                        type: 'mat4x2',
                        name: 'm',
                    },
                ],
            },
            {
                returnType: 'mat3x2',
                name: 'transpose',
                parameters: [
                    {
                        type: 'mat2x3',
                        name: 'm',
                    },
                ],
            },
            {
                returnType: 'mat3x4',
                name: 'transpose',
                parameters: [
                    {
                        type: 'mat4x3',
                        name: 'm',
                    },
                ],
            },
            {
                returnType: 'mat4x2',
                name: 'transpose',
                parameters: [
                    {
                        type: 'mat2x4',
                        name: 'm',
                    },
                ],
            },
            {
                returnType: 'mat4x3',
                name: 'transpose',
                parameters: [
                    {
                        type: 'mat3x4',
                        name: 'm',
                    },
                ],
            },
            {
                returnType: 'vec4',
                name: 'texture2DLodEXT',
                parameters: [
                    {
                        type: 'sampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec2',
                        name: 'coord',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                returnType: 'vec4',
                name: 'texture2DProjLodEXT',
                parameters: [
                    {
                        type: 'sampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'coord',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                returnType: 'vec4',
                name: 'texture2DProjLodEXT',
                parameters: [
                    {
                        type: 'sampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'coord',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                returnType: 'vec4',
                name: 'textureCubeLodEXT',
                parameters: [
                    {
                        type: 'samplerCube',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'coord',
                    },
                    {
                        type: 'float',
                        name: 'lod',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                returnType: 'vec4',
                name: 'texture2DGradEXT',
                parameters: [
                    {
                        type: 'sampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec2',
                        name: 'P',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdy',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                returnType: 'vec4',
                name: 'texture2DProjGradEXT',
                parameters: [
                    {
                        type: 'sampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdy',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                returnType: 'vec4',
                name: 'texture2DProjGradEXT',
                parameters: [
                    {
                        type: 'sampler2D',
                        name: 'sampler',
                    },
                    {
                        type: 'vec4',
                        name: 'P',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec2',
                        name: 'dPdy',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                returnType: 'vec4',
                name: 'textureCubeGradEXT',
                parameters: [
                    {
                        type: 'samplerCube',
                        name: 'sampler',
                    },
                    {
                        type: 'vec3',
                        name: 'P',
                    },
                    {
                        type: 'vec3',
                        name: 'dPdx',
                    },
                    {
                        type: 'vec3',
                        name: 'dPdy',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
        ],
    ],
]);
