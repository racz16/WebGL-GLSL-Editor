import { IFunctionSummary } from '../interfaces';

export const functionSummaries = new Map<string, Array<IFunctionSummary>>([
    [
        '100',
        [
            {
                name: 'acos',
                summary: 'Return the arccosine of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value whose arccosine to return.',
                    },
                ],
            },
            {
                name: 'asin',
                summary: 'Return the arcsine of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value whose arcsine to return.',
                    },
                ],
            },
            {
                name: 'atan',
                summary: 'Return the arc-tangent of the parameters.',
                parameters: [
                    {
                        name: 'y',
                        summary: 'Specify the numerator of the fraction whose arctangent to return.',
                    },
                    {
                        name: 'x',
                        summary: 'Specify the denominator of the fraction whose arctangent to return.',
                    },
                    {
                        name: 'y_over_x',
                        summary: 'Specify the fraction whose arctangent to return.',
                    },
                ],
            },
            {
                name: 'cos',
                summary: 'Return the cosine of the parameter.',
                parameters: [
                    {
                        name: 'angle',
                        summary: 'Specify the quantity, in radians, of which to return the cosine.',
                    },
                ],
            },
            {
                name: 'degrees',
                summary: 'Convert a quantity in radians to degrees.',
                parameters: [
                    {
                        name: 'radians',
                        summary: 'Specify the quantity, in radians, to be converted to degrees.',
                    },
                ],
            },
            {
                name: 'radians',
                summary: 'Convert a quantity in degrees to radians.',
                parameters: [
                    {
                        name: 'degrees',
                        summary: 'Specify the quantity, in degrees, to be converted to radians.',
                    },
                ],
            },
            {
                name: 'sin',
                summary: 'Return the sine of the parameter.',
                parameters: [
                    {
                        name: 'angle',
                        summary: 'Specify the quantity, in radians, of which to return the sine.',
                    },
                ],
            },
            {
                name: 'tan',
                summary: 'Return the tangent of the parameter.',
                parameters: [
                    {
                        name: 'angle',
                        summary: 'Specify the quantity, in radians, of which to return the tangent.',
                    },
                ],
            },
            {
                name: 'abs',
                summary: 'Return the absolute value of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value of which to return the absolute.',
                    },
                ],
            },
            {
                name: 'ceil',
                summary: 'Find the nearest integer that is greater than or equal to the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value to evaluate.',
                    },
                ],
            },
            {
                name: 'clamp',
                summary: 'Constrain a value to lie between two further values.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value to constrain.',
                    },
                    {
                        name: 'minVal',
                        summary: 'Specify the lower end of the range into which to constrain x.',
                    },
                    {
                        name: 'maxVal',
                        summary: 'Specify the upper end of the range into which to constrain x.',
                    },
                ],
            },
            {
                name: 'exp',
                summary: 'Return the natural exponentiation of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value to exponentiate.',
                    },
                ],
            },
            {
                name: 'exp2',
                summary: 'Return 2 raised to the power of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value of the power to which 2 will be raised.',
                    },
                ],
            },
            {
                name: 'floor',
                summary: 'Find the nearest integer less than or equal to the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value to evaluate.',
                    },
                ],
            },
            {
                name: 'fract',
                summary: 'Compute the fractional part of the argument.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value to evaluate.',
                    },
                ],
            },
            {
                name: 'inversesqrt',
                summary: 'Return the inverse of the square root of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value of which to take the inverse of the square root.',
                    },
                ],
            },
            {
                name: 'log',
                summary: 'Return the natural logarithm of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value of which to take the natural logarithm.',
                    },
                ],
            },
            {
                name: 'log2',
                summary: 'Return the base 2 logarithm of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value of which to take the base 2 logarithm.',
                    },
                ],
            },
            {
                name: 'max',
                summary: 'Return the greater of two values.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the first value to compare.',
                    },
                    {
                        name: 'y',
                        summary: 'Specify the second value to compare.',
                    },
                ],
            },
            {
                name: 'min',
                summary: 'Return the lesser of two values.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the first value to compare.',
                    },
                    {
                        name: 'y',
                        summary: 'Specify the second value to compare.',
                    },
                ],
            },
            {
                name: 'mix',
                summary: 'Linearly interpolate between two values.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the start of the range in which to interpolate.',
                    },
                    {
                        name: 'y',
                        summary: 'Specify the end of the range in which to interpolate.',
                    },
                    {
                        name: 'a',
                        summary: 'Specify the value to use to interpolate between x and y.',
                    },
                ],
            },
            {
                name: 'mod',
                summary: 'Compute value of one parameter modulo another.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value to evaluate.',
                    },
                    {
                        name: 'y',
                        summary: 'Specify the value by which to perform the modulo.',
                    },
                ],
            },
            {
                name: 'pow',
                summary: 'Return the value of the first parameter raised to the power of the second.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value to raise to the power y.',
                    },
                    {
                        name: 'y',
                        summary: 'Specify the power to which to raise x.',
                    },
                ],
            },
            {
                name: 'sign',
                summary: 'Extract the sign of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value from which to extract the sign.',
                    },
                ],
            },
            {
                name: 'smoothstep',
                summary: 'Perform Hermite interpolation between two values.',
                parameters: [
                    {
                        name: 'edge0',
                        summary: 'Specifies the value of the lower edge of the Hermite function.',
                    },
                    {
                        name: 'edge1',
                        summary: 'Specifies the value of the upper edge of the Hermite function.',
                    },
                    {
                        name: 'x',
                        summary: 'Specifies the source value for interpolation.',
                    },
                ],
            },
            {
                name: 'sqrt',
                summary: 'Return the square root of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value of which to take the square root.',
                    },
                ],
            },
            {
                name: 'step',
                summary: 'Generate a step function by comparing two values.',
                parameters: [
                    {
                        name: 'edge',
                        summary: 'Specifies the location of the edge of the step function.',
                    },
                    {
                        name: 'x',
                        summary: 'Specify the value to be used to generate the step function.',
                    },
                ],
            },
            {
                name: 'cross',
                summary: 'Calculate the cross product of two vectors.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the first of two vectors.',
                    },
                    {
                        name: 'y',
                        summary: 'Specifies the second of two vectors.',
                    },
                ],
            },
            {
                name: 'distance',
                summary: 'Calculate the distance between two points.',
                parameters: [
                    {
                        name: 'p0',
                        summary: 'Specifies the first of two points.',
                    },
                    {
                        name: 'p1',
                        summary: 'Specifies the second of two points.',
                    },
                ],
            },
            {
                name: 'dot',
                summary: 'Calculate the dot product of two vectors.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the first of two vectors.',
                    },
                    {
                        name: 'y',
                        summary: 'Specifies the second of two vectors.',
                    },
                ],
            },
            {
                name: 'equal',
                summary: 'Perform a component-wise equal-to comparison of two vectors.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the first vector to be used in the comparison operation.',
                    },
                    {
                        name: 'y',
                        summary: 'Specifies the second vector to be used in the comparison operation.',
                    },
                ],
            },
            {
                name: 'faceforward',
                summary: 'Return a vector pointing in the same direction as another.',
                parameters: [
                    {
                        name: 'N',
                        summary: 'Specifies the vector to orient.',
                    },
                    {
                        name: 'I',
                        summary: 'Specifies the incident vector.',
                    },
                    {
                        name: 'Nref',
                        summary: 'Specifies the reference vector.',
                    },
                ],
            },
            {
                name: 'length',
                summary: 'Calculate the length of a vector.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies a vector of which to calculate the length.',
                    },
                ],
            },
            {
                name: 'normalize',
                summary: 'Calculate the normalize product of two vectors.',
                parameters: [
                    {
                        name: 'v',
                        summary: 'Specifies the vector to normalize.',
                    },
                ],
            },
            {
                name: 'notEqual',
                summary: 'Perform a component-wise not-equal-to comparison of two vectors.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the first vector to be used in the comparison operation.',
                    },
                    {
                        name: 'y',
                        summary: 'Specifies the second vector to be used in the comparison operation.',
                    },
                ],
            },
            {
                name: 'reflect',
                summary: 'Calculate the reflection direction for an incident vector.',
                parameters: [
                    {
                        name: 'I',
                        summary: 'Specifies the incident vector.',
                    },
                    {
                        name: 'N',
                        summary: 'Specifies the normal vector.',
                    },
                ],
            },
            {
                name: 'refract',
                summary: 'Calculate the refraction direction for an incident vector.',
                parameters: [
                    {
                        name: 'I',
                        summary: 'Specifies the incident vector.',
                    },
                    {
                        name: 'N',
                        summary: 'Specifies the normal vector.',
                    },
                    {
                        name: 'eta',
                        summary: 'Specifies the ratio of indices of refraction.',
                    },
                ],
            },
            {
                name: 'all',
                summary: 'Check whether all elements of a boolean vector are true.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the vector to be tested for truth.',
                    },
                ],
            },
            {
                name: 'any',
                summary: 'Check whether any element of a boolean vector is true.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the vector to be tested for truth.',
                    },
                ],
            },
            {
                name: 'greaterThan',
                summary: 'Perform a component-wise greater-than comparison of two vectors.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the first vector to be used in the comparison operation.',
                    },
                    {
                        name: 'y',
                        summary: 'Specifies the second vector to be used in the comparison operation.',
                    },
                ],
            },
            {
                name: 'greaterThanEqual',
                summary: 'Perform a component-wise greater-than-or-equal comparison of two vectors.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the first vector to be used in the comparison operation.',
                    },
                    {
                        name: 'y',
                        summary: 'Specifies the second vector to be used in the comparison operation.',
                    },
                ],
            },
            {
                name: 'lessThan',
                summary: 'Perform a component-wise less-than comparison of two vectors.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the first vector to be used in the comparison operation.',
                    },
                    {
                        name: 'y',
                        summary: 'Specifies the second vector to be used in the comparison operation.',
                    },
                ],
            },
            {
                name: 'lessThanEqual',
                summary: 'Perform a component-wise less-than-or-equal comparison of two vectors.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the first vector to be used in the comparison operation.',
                    },
                    {
                        name: 'y',
                        summary: 'Specifies the second vector to be used in the comparison operation.',
                    },
                ],
            },
            {
                name: 'not',
                summary: 'Logically invert a boolean vector.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the vector to be inverted.',
                    },
                ],
            },
            {
                name: 'texture2D',
                summary: 'Retrieves texels from a texture.',
                parameters: [
                    {
                        name: 'sampler',
                        summary:
                            'Specifies the sampler to which the texture from which texels will be retrieved is bound.',
                    },
                    {
                        name: 'coord',
                        summary: 'Specifies the texture coordinates at which texture will be sampled.',
                    },
                    {
                        name: 'bias',
                        summary: 'Specifies an optional bias to be applied during level-of-detail computation.',
                    },
                ],
            },
            {
                name: 'texture2DProj',
                summary: 'Perform a texture lookup with projection.',
                parameters: [
                    {
                        name: 'sampler',
                        summary:
                            'Specifies the sampler to which the texture from which texels will be retrieved is bound.',
                    },
                    {
                        name: 'coord',
                        summary: 'Specifies the texture coordinates at which texture will be sampled.',
                    },
                    {
                        name: 'bias',
                        summary: 'Specifies an optional bias to be applied during level-of-detail computation.',
                    },
                ],
            },
            {
                name: 'texture2DLod',
                summary: 'Perform a texture lookup with explicit level-of-detail.',
                parameters: [
                    {
                        name: 'sampler',
                        summary:
                            'Specifies the sampler to which the texture from which texels will be retrieved is bound.',
                    },
                    {
                        name: 'coord',
                        summary: 'Specifies the texture coordinates at which texture will be sampled.',
                    },
                    {
                        name: 'lod',
                        summary: 'Specifies the explicit level-of-detail.',
                    },
                ],
            },
            {
                name: 'texture2DProjLod',
                summary: 'Perform a texture lookup with projection and explicit level-of-detail.',
                parameters: [
                    {
                        name: 'sampler',
                        summary:
                            'Specifies the sampler to which the texture from which texels will be retrieved is bound.',
                    },
                    {
                        name: 'coord',
                        summary: 'Specifies the texture coordinates at which texture will be sampled.',
                    },
                    {
                        name: 'lod',
                        summary: 'Specifies the explicit level-of-detail from which to fetch texels.',
                    },
                ],
            },
            {
                name: 'textureCube',
                summary: 'Retrieves texels from a texture.',
                parameters: [
                    {
                        name: 'sampler',
                        summary:
                            'Specifies the sampler to which the texture from which texels will be retrieved is bound.',
                    },
                    {
                        name: 'coord',
                        summary: 'Specifies the texture coordinates at which texture will be sampled.',
                    },
                    {
                        name: 'bias',
                        summary: 'Specifies an optional bias to be applied during level-of-detail computation.',
                    },
                ],
            },
            {
                name: 'textureCubeLod',
                summary: 'Perform a texture lookup with explicit level-of-detail.',
                parameters: [
                    {
                        name: 'sampler',
                        summary:
                            'Specifies the sampler to which the texture from which texels will be retrieved is bound.',
                    },
                    {
                        name: 'coord',
                        summary: 'Specifies the texture coordinates at which texture will be sampled.',
                    },
                    {
                        name: 'lod',
                        summary: 'Specifies the explicit level-of-detail.',
                    },
                ],
            },
            {
                name: 'matrixCompMult',
                summary: 'Perform a component-wise multiplication of two matrices.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the first matrix multiplicand.',
                    },
                    {
                        name: 'y',
                        summary: 'Specifies the second matrix multiplicand.',
                    },
                ],
            },
            {
                name: 'fwidth',
                parameters: [
                    {
                        name: 'p',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_OES_standard_derivatives',
            },
            {
                name: 'dFdx',
                parameters: [
                    {
                        name: 'p',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_OES_standard_derivatives',
            },
            {
                name: 'dFdy',
                parameters: [
                    {
                        name: 'p',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_OES_standard_derivatives',
            },
            {
                name: 'texture2DLodEXT',
                parameters: [
                    {
                        name: 'sampler',
                    },
                    {
                        name: 'coord',
                    },
                    {
                        name: 'lod',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                name: 'texture2DProjLodEXT',
                parameters: [
                    {
                        name: 'sampler',
                    },
                    {
                        name: 'coord',
                    },
                    {
                        name: 'lod',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                name: 'texture2DProjLodEXT',
                parameters: [
                    {
                        name: 'sampler',
                    },
                    {
                        name: 'coord',
                    },
                    {
                        name: 'lod',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                name: 'textureCubeLodEXT',
                parameters: [
                    {
                        name: 'sampler',
                    },
                    {
                        name: 'coord',
                    },
                    {
                        name: 'lod',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                name: 'texture2DGradEXT',
                parameters: [
                    {
                        name: 'sampler',
                    },
                    {
                        name: 'P',
                    },
                    {
                        name: 'dPdx',
                    },
                    {
                        name: 'dPdy',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                name: 'texture2DProjGradEXT',
                parameters: [
                    {
                        name: 'sampler',
                    },
                    {
                        name: 'P',
                    },
                    {
                        name: 'dPdx',
                    },
                    {
                        name: 'dPdy',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                name: 'texture2DProjGradEXT',
                parameters: [
                    {
                        name: 'sampler',
                    },
                    {
                        name: 'P',
                    },
                    {
                        name: 'dPdx',
                    },
                    {
                        name: 'dPdy',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                name: 'textureCubeGradEXT',
                parameters: [
                    {
                        name: 'sampler',
                    },
                    {
                        name: 'P',
                    },
                    {
                        name: 'dPdx',
                    },
                    {
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
                name: 'acos',
                summary: 'Return the arccosine of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value whose arccosine to return.',
                    },
                ],
            },
            {
                name: 'acosh',
                summary: 'Return the arc hyperbolic cosine of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value whose arc hyperbolic cosine to return.',
                    },
                ],
            },
            {
                name: 'asin',
                summary: 'Return the arcsine of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value whose arcsine to return.',
                    },
                ],
            },
            {
                name: 'asinh',
                summary: 'Return the arc hyperbolic sine of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value whose arc hyperbolic sine to return.',
                    },
                ],
            },
            {
                name: 'atan',
                summary: 'Return the arc-tangent of the parameters.',
                parameters: [
                    {
                        name: 'y',
                        summary: 'Specify the numerator of the fraction whose arctangent to return.',
                    },
                    {
                        name: 'x',
                        summary: 'Specify the denominator of the fraction whose arctangent to return.',
                    },
                    {
                        name: 'y_over_x',
                        summary: 'Specify the fraction whose arctangent to return.',
                    },
                ],
            },
            {
                name: 'atanh',
                summary: 'Return the arc hyperbolic tangent of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value whose arc hyperbolic tangent to return.',
                    },
                ],
            },
            {
                name: 'cos',
                summary: 'Return the cosine of the parameter.',
                parameters: [
                    {
                        name: 'angle',
                        summary: 'Specify the quantity, in radians, of which to return the cosine.',
                    },
                ],
            },
            {
                name: 'cosh',
                summary: 'Return the hyperbolic cosine of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value whose hyperbolic cosine to return.',
                    },
                ],
            },
            {
                name: 'degrees',
                summary: 'Convert a quantity in radians to degrees.',
                parameters: [
                    {
                        name: 'radians',
                        summary: 'Specify the quantity, in radians, to be converted to degrees.',
                    },
                ],
            },
            {
                name: 'radians',
                summary: 'Convert a quantity in degrees to radians.',
                parameters: [
                    {
                        name: 'degrees',
                        summary: 'Specify the quantity, in degrees, to be converted to radians.',
                    },
                ],
            },
            {
                name: 'sin',
                summary: 'Return the sine of the parameter.',
                parameters: [
                    {
                        name: 'angle',
                        summary: 'Specify the quantity, in radians, of which to return the sine.',
                    },
                ],
            },
            {
                name: 'sinh',
                summary: 'Return the hyperbolic sine of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value whose hyperbolic sine to return.',
                    },
                ],
            },
            {
                name: 'tan',
                summary: 'Return the tangent of the parameter.',
                parameters: [
                    {
                        name: 'angle',
                        summary: 'Specify the quantity, in radians, of which to return the tangent.',
                    },
                ],
            },
            {
                name: 'tanh',
                summary: 'Return the hyperbolic tangent of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value whose hyperbolic tangent to return.',
                    },
                ],
            },
            {
                name: 'abs',
                summary: 'Return the absolute value of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value of which to return the absolute.',
                    },
                ],
            },
            {
                name: 'ceil',
                summary: 'Find the nearest integer that is greater than or equal to the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value to evaluate.',
                    },
                ],
            },
            {
                name: 'clamp',
                summary: 'Constrain a value to lie between two further values.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value to constrain.',
                    },
                    {
                        name: 'minVal',
                        summary: 'Specify the lower end of the range into which to constrain x.',
                    },
                    {
                        name: 'maxVal',
                        summary: 'Specify the upper end of the range into which to constrain x.',
                    },
                ],
            },
            {
                name: 'dFdx',
                summary: 'Returns the derivative in x using local differencing for the input argument p.',
                stage: 'fragment',
                parameters: [
                    {
                        name: 'p',
                        summary: 'Specifies the expression of which to take the partial derivative.',
                    },
                ],
            },
            {
                name: 'dFdy',
                summary: 'Returns the derivative in y using local differencing for the input argument p.',
                stage: 'fragment',
                parameters: [
                    {
                        name: 'p',
                        summary: 'Specifies the expression of which to take the partial derivative.',
                    },
                ],
            },
            {
                name: 'exp',
                summary: 'Return the natural exponentiation of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value to exponentiate.',
                    },
                ],
            },
            {
                name: 'exp2',
                summary: 'Return 2 raised to the power of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value of the power to which 2 will be raised.',
                    },
                ],
            },
            {
                name: 'floor',
                summary: 'Find the nearest integer less than or equal to the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value to evaluate.',
                    },
                ],
            },
            {
                name: 'fract',
                summary: 'Compute the fractional part of the argument.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value to evaluate.',
                    },
                ],
            },
            {
                name: 'fwidth',
                summary: 'Return the sum of the absolute derivatives in x and y.',
                stage: 'fragment',
                parameters: [
                    {
                        name: 'p',
                        summary: 'Specifies the expression of which to take the partial derivative.',
                    },
                ],
            },
            {
                name: 'inversesqrt',
                summary: 'Return the inverse of the square root of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value of which to take the inverse of the square root.',
                    },
                ],
            },
            {
                name: 'isinf',
                summary: 'Determine whether the parameter is positive or negative infinity.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the value to test for infinity.',
                    },
                ],
            },
            {
                name: 'isnan',
                summary: 'Determine whether the parameter is a number.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the value to test for NaN.',
                    },
                ],
            },
            {
                name: 'log',
                summary: 'Return the natural logarithm of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value of which to take the natural logarithm.',
                    },
                ],
            },
            {
                name: 'log2',
                summary: 'Return the base 2 logarithm of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value of which to take the base 2 logarithm.',
                    },
                ],
            },
            {
                name: 'max',
                summary: 'Return the greater of two values.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the first value to compare.',
                    },
                    {
                        name: 'y',
                        summary: 'Specify the second value to compare.',
                    },
                ],
            },
            {
                name: 'min',
                summary: 'Return the lesser of two values.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the first value to compare.',
                    },
                    {
                        name: 'y',
                        summary: 'Specify the second value to compare.',
                    },
                ],
            },
            {
                name: 'mix',
                summary: 'Linearly interpolate between two values.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the start of the range in which to interpolate.',
                    },
                    {
                        name: 'y',
                        summary: 'Specify the end of the range in which to interpolate.',
                    },
                    {
                        name: 'a',
                        summary: 'Specify the value to use to interpolate between x and y.',
                    },
                ],
            },
            {
                name: 'mod',
                summary: 'Compute value of one parameter modulo another.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value to evaluate.',
                    },
                    {
                        name: 'y',
                        summary: 'Specify the value by which to perform the modulo.',
                    },
                ],
            },
            {
                name: 'modf',
                summary: 'Separate a value into its integer and fractional components.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value to separate.',
                    },
                    {
                        name: 'i',
                        summary: 'A variable that receives the integer part of the argument.',
                    },
                ],
            },
            {
                name: 'pow',
                summary: 'Return the value of the first parameter raised to the power of the second.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value to raise to the power y.',
                    },
                    {
                        name: 'y',
                        summary: 'Specify the power to which to raise x.',
                    },
                ],
            },
            {
                name: 'round',
                summary: 'Find the nearest integer to the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value to evaluate.',
                    },
                ],
            },
            {
                name: 'roundEven',
                summary: 'Find the nearest even integer to the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value to evaluate.',
                    },
                ],
            },
            {
                name: 'sign',
                summary: 'Extract the sign of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value from which to extract the sign.',
                    },
                ],
            },
            {
                name: 'smoothstep',
                summary: 'Perform Hermite interpolation between two values.',
                parameters: [
                    {
                        name: 'edge0',
                        summary: 'Specifies the value of the lower edge of the Hermite function.',
                    },
                    {
                        name: 'edge1',
                        summary: 'Specifies the value of the upper edge of the Hermite function.',
                    },
                    {
                        name: 'x',
                        summary: 'Specifies the source value for interpolation.',
                    },
                ],
            },
            {
                name: 'sqrt',
                summary: 'Return the square root of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value of which to take the square root.',
                    },
                ],
            },
            {
                name: 'step',
                summary: 'Generate a step function by comparing two values.',
                parameters: [
                    {
                        name: 'edge',
                        summary: 'Specifies the location of the edge of the step function.',
                    },
                    {
                        name: 'x',
                        summary: 'Specify the value to be used to generate the step function.',
                    },
                ],
            },
            {
                name: 'trunc',
                summary: 'Find the truncated value of the parameter.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specify the value of which to take the square root.',
                    },
                ],
            },
            {
                name: 'floatBitsToInt',
                summary: 'Produce the encoding of a floating point value as an integer.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the value whose floating point encoding to return.',
                    },
                ],
            },
            {
                name: 'floatBitsToUint',
                summary: 'Produce the encoding of a floating point value as an integer.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the value whose floating point encoding to return.',
                    },
                ],
            },
            {
                name: 'intBitsToFloat',
                summary: 'Produce a floating point using an encoding supplied as an integer.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the bit encoding to return as a floating point value.',
                    },
                ],
            },
            {
                name: 'uintBitsToFloat',
                summary: 'Produce a floating point using an encoding supplied as an integer.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the bit encoding to return as a floating point value.',
                    },
                ],
            },
            {
                name: 'packHalf2x16',
                summary:
                    'Convert two 32-bit floating-point quantities to 16-bit quantities and pack them into a single 32-bit integer.',
                parameters: [
                    {
                        name: 'v',
                        summary:
                            'Specify a vector of two 32-bit floating point values that are to be converted to 16-bit representation and packed into the result.',
                    },
                ],
            },
            {
                name: 'packUnorm2x16',
                summary: 'Pack floating-point values into an unsigned integer.',
                parameters: [
                    {
                        name: 'v',
                        summary: 'Specifies a vector of values to be packed into an unsigned integer.',
                    },
                ],
            },
            {
                name: 'packSnorm2x16',
                summary: 'Pack floating-point values into an unsigned integer.',
                parameters: [
                    {
                        name: 'v',
                        summary: 'Specifies a vector of values to be packed into an unsigned integer.',
                    },
                ],
            },
            {
                name: 'unpackHalf2x16',
                summary:
                    'Convert two 16-bit floating-point values packed into a single 32-bit integer into a vector of two 32-bit floating-point quantities.',
                parameters: [
                    {
                        name: 'v',
                        summary:
                            'Specify a single 32-bit unsigned integer values that contains two 16-bit floating point values to be unpacked.',
                    },
                ],
            },
            {
                name: 'unpackUnorm2x16',
                summary: 'Unpack floating-point values from an unsigned integer.',
                parameters: [
                    {
                        name: 'p',
                        summary: 'Specifies an unsigned integer containing packed floating-point values.',
                    },
                ],
            },
            {
                name: 'unpackSnorm2x16',
                summary: 'Unpack floating-point values from an unsigned integer.',
                parameters: [
                    {
                        name: 'p',
                        summary: 'Specifies an unsigned integer containing packed floating-point values.',
                    },
                ],
            },
            {
                name: 'cross',
                summary: 'Calculate the cross product of two vectors.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the first of two vectors.',
                    },
                    {
                        name: 'y',
                        summary: 'Specifies the second of two vectors.',
                    },
                ],
            },
            {
                name: 'distance',
                summary: 'Calculate the distance between two points.',
                parameters: [
                    {
                        name: 'p0',
                        summary: 'Specifies the first of two points.',
                    },
                    {
                        name: 'p1',
                        summary: 'Specifies the second of two points.',
                    },
                ],
            },
            {
                name: 'dot',
                summary: 'Calculate the dot product of two vectors.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the first of two vectors.',
                    },
                    {
                        name: 'y',
                        summary: 'Specifies the second of two vectors.',
                    },
                ],
            },
            {
                name: 'equal',
                summary: 'Perform a component-wise equal-to comparison of two vectors.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the first vector to be used in the comparison operation.',
                    },
                    {
                        name: 'y',
                        summary: 'Specifies the second vector to be used in the comparison operation.',
                    },
                ],
            },
            {
                name: 'faceforward',
                summary: 'Return a vector pointing in the same direction as another.',
                parameters: [
                    {
                        name: 'N',
                        summary: 'Specifies the vector to orient.',
                    },
                    {
                        name: 'I',
                        summary: 'Specifies the incident vector.',
                    },
                    {
                        name: 'Nref',
                        summary: 'Specifies the reference vector.',
                    },
                ],
            },
            {
                name: 'length',
                summary: 'Calculate the length of a vector.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies a vector of which to calculate the length.',
                    },
                ],
            },
            {
                name: 'normalize',
                summary: 'Calculate the normalize product of two vectors.',
                parameters: [
                    {
                        name: 'v',
                        summary: 'Specifies the vector to normalize.',
                    },
                ],
            },
            {
                name: 'notEqual',
                summary: 'Perform a component-wise not-equal-to comparison of two vectors.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the first vector to be used in the comparison operation.',
                    },
                    {
                        name: 'y',
                        summary: 'Specifies the second vector to be used in the comparison operation.',
                    },
                ],
            },
            {
                name: 'reflect',
                summary: 'Calculate the reflection direction for an incident vector.',
                parameters: [
                    {
                        name: 'I',
                        summary: 'Specifies the incident vector.',
                    },
                    {
                        name: 'N',
                        summary: 'Specifies the normal vector.',
                    },
                ],
            },
            {
                name: 'refract',
                summary: 'Calculate the refraction direction for an incident vector.',
                parameters: [
                    {
                        name: 'I',
                        summary: 'Specifies the incident vector.',
                    },
                    {
                        name: 'N',
                        summary: 'Specifies the normal vector.',
                    },
                    {
                        name: 'eta',
                        summary: 'Specifies the ratio of indices of refraction.',
                    },
                ],
            },
            {
                name: 'all',
                summary: 'Check whether all elements of a boolean vector are true.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the vector to be tested for truth.',
                    },
                ],
            },
            {
                name: 'any',
                summary: 'Check whether any element of a boolean vector is true.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the vector to be tested for truth.',
                    },
                ],
            },
            {
                name: 'greaterThan',
                summary: 'Perform a component-wise greater-than comparison of two vectors.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the first vector to be used in the comparison operation.',
                    },
                    {
                        name: 'y',
                        summary: 'Specifies the second vector to be used in the comparison operation.',
                    },
                ],
            },
            {
                name: 'greaterThanEqual',
                summary: 'Perform a component-wise greater-than-or-equal comparison of two vectors.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the first vector to be used in the comparison operation.',
                    },
                    {
                        name: 'y',
                        summary: 'Specifies the second vector to be used in the comparison operation.',
                    },
                ],
            },
            {
                name: 'lessThan',
                summary: 'Perform a component-wise less-than comparison of two vectors.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the first vector to be used in the comparison operation.',
                    },
                    {
                        name: 'y',
                        summary: 'Specifies the second vector to be used in the comparison operation.',
                    },
                ],
            },
            {
                name: 'lessThanEqual',
                summary: 'Perform a component-wise less-than-or-equal comparison of two vectors.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the first vector to be used in the comparison operation.',
                    },
                    {
                        name: 'y',
                        summary: 'Specifies the second vector to be used in the comparison operation.',
                    },
                ],
            },
            {
                name: 'not',
                summary: 'Logically invert a boolean vector.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the vector to be inverted.',
                    },
                ],
            },
            {
                name: 'texelFetch',
                summary: 'Perform a lookup of a single texel within a texture.',
                parameters: [
                    {
                        name: 'sampler',
                        summary:
                            'Specifies the sampler to which the texture from which texels will be retrieved is bound.',
                    },
                    {
                        name: 'P',
                        summary: 'Specifies the texture coordinates at which texture will be sampled.',
                    },
                    {
                        name: 'lod',
                        summary:
                            'If present, specifies the level-of-detail within the texture from which the texel will be fetched.',
                    },
                ],
            },
            {
                name: 'texelFetchOffset',
                summary: 'Perform a lookup of a single texel within a texture with an offset.',
                parameters: [
                    {
                        name: 'sampler',
                        summary:
                            'Specifies the sampler to which the texture from which texels will be retrieved is bound.',
                    },
                    {
                        name: 'P',
                        summary: 'Specifies the texture coordinates at which texture will be sampled.',
                    },
                    {
                        name: 'lod',
                        summary:
                            'If present, specifies the level-of-detail within the texture from which the texel will be fetched.',
                    },
                    {
                        name: 'offset',
                        summary: 'Specifies offset, in texels that will be applied to P before looking up the texel.',
                    },
                ],
            },
            {
                name: 'texture',
                summary: 'Retrieves texels from a texture.',
                parameters: [
                    {
                        name: 'sampler',
                        summary:
                            'Specifies the sampler to which the texture from which texels will be retrieved is bound.',
                    },
                    {
                        name: 'P',
                        summary: 'Specifies the texture coordinates at which texture will be sampled.',
                    },
                    {
                        name: 'bias',
                        summary: 'Specifies an optional bias to be applied during level-of-detail computation.',
                    },
                ],
            },
            {
                name: 'textureGrad',
                summary: 'Perform a texture lookup with explicit gradients.',
                parameters: [
                    {
                        name: 'sampler',
                        summary:
                            'Specifies the sampler to which the texture from which texels will be retrieved is bound.',
                    },
                    {
                        name: 'P',
                        summary: 'Specifies the texture coordinates at which texture will be sampled.',
                    },
                    {
                        name: 'dPdx',
                        summary: 'Specifies the partial derivative of P with respect to window x.',
                    },
                    {
                        name: 'dPdy',
                        summary: 'Specifies the partial derivative of P with respect to window y.',
                    },
                ],
            },
            {
                name: 'textureGradOffset',
                summary: 'Perform a texture lookup with explicit gradients and offset.',
                parameters: [
                    {
                        name: 'sampler',
                        summary:
                            'Specifies the sampler to which the texture from which texels will be retrieved is bound.',
                    },
                    {
                        name: 'P',
                        summary: 'Specifies the texture coordinates at which texture will be sampled.',
                    },
                    {
                        name: 'dPdx',
                        summary: 'Specifies the partial derivative of P with respect to window x.',
                    },
                    {
                        name: 'dPdy',
                        summary: 'Specifies the partial derivative of P with respect to window y.',
                    },
                    {
                        name: 'offset',
                        summary: 'Specifies the offset to be applied to the texture coordinates before sampling.',
                    },
                ],
            },
            {
                name: 'textureLod',
                summary: 'Perform a texture lookup with explicit level-of-detail.',
                parameters: [
                    {
                        name: 'sampler',
                        summary:
                            'Specifies the sampler to which the texture from which texels will be retrieved is bound.',
                    },
                    {
                        name: 'P',
                        summary: 'Specifies the texture coordinates at which texture will be sampled.',
                    },
                    {
                        name: 'lod',
                        summary: 'Specifies the explicit level-of-detail.',
                    },
                ],
            },
            {
                name: 'textureLodOffset',
                summary: 'Perform a texture lookup with explicit level-of-detail and offset.',
                parameters: [
                    {
                        name: 'sampler',
                        summary:
                            'Specifies the sampler to which the texture from which texels will be retrieved is bound.',
                    },
                    {
                        name: 'P',
                        summary: 'Specifies the texture coordinates at which the texture will be sampled.',
                    },
                    {
                        name: 'lod',
                        summary: 'Specifies the explicit level-of-detail from which texels will be fetched.',
                    },
                    {
                        name: 'offset',
                        summary: 'Specifies the offset that will be applied to P before texels are fetched.',
                    },
                ],
            },
            {
                name: 'textureOffset',
                summary: 'Perform a texture lookup with offset.',
                parameters: [
                    {
                        name: 'sampler',
                        summary:
                            'Specifies the sampler to which the texture from which texels will be retrieved is bound.',
                    },
                    {
                        name: 'P',
                        summary: 'Specifies the texture coordinates at which texture will be sampled.',
                    },
                    {
                        name: 'offset',
                        summary: 'Specifies offset, in texels that will be applied to P before looking up the texel.',
                    },
                    {
                        name: 'bias',
                        summary: 'Specifies an optional bias to be applied during level-of-detail computation.',
                    },
                ],
            },
            {
                name: 'textureProj',
                summary: 'Perform a texture lookup with projection.',
                parameters: [
                    {
                        name: 'sampler',
                        summary:
                            'Specifies the sampler to which the texture from which texels will be retrieved is bound.',
                    },
                    {
                        name: 'P',
                        summary: 'Specifies the texture coordinates at which texture will be sampled.',
                    },
                    {
                        name: 'bias',
                        summary: 'Specifies an optional bias to be applied during level-of-detail computation.',
                    },
                ],
            },
            {
                name: 'textureProjGrad',
                summary: 'Perform a texture lookup with projection and explicit gradients.',
                parameters: [
                    {
                        name: 'sampler',
                        summary:
                            'Specifies the sampler to which the texture from which texels will be retrieved is bound.',
                    },
                    {
                        name: 'P',
                        summary: 'Specifies the texture coordinates at which texture will be sampled.',
                    },
                    {
                        name: 'dPdx',
                        summary: 'Specifies the partial derivative of P with respect to window x.',
                    },
                    {
                        name: 'dPdy',
                        summary: 'Specifies the partial derivative of P with respect to window y.',
                    },
                ],
            },
            {
                name: 'textureProjGradOffset',
                summary: 'Perform a texture lookup with projection, explicit gradients and offset.',
                parameters: [
                    {
                        name: 'sampler',
                        summary:
                            'Specifies the sampler to which the texture from which texels will be retrieved is bound.',
                    },
                    {
                        name: 'P',
                        summary: 'Specifies the texture coordinates at which texture will be sampled.',
                    },
                    {
                        name: 'dPdx',
                        summary: 'Specifies the partial derivative of P with respect to window x.',
                    },
                    {
                        name: 'dPdy',
                        summary: 'Specifies the partial derivative of P with respect to window y.',
                    },
                    {
                        name: 'offset',
                        summary:
                            'Specifies the offsets, in texels at which the texture will be sampled relative to the projection of P.',
                    },
                ],
            },
            {
                name: 'textureProjLod',
                summary: 'Perform a texture lookup with projection and explicit level-of-detail.',
                parameters: [
                    {
                        name: 'sampler',
                        summary:
                            'Specifies the sampler to which the texture from which texels will be retrieved is bound.',
                    },
                    {
                        name: 'P',
                        summary: 'Specifies the texture coordinates at which texture will be sampled.',
                    },
                    {
                        name: 'lod',
                        summary: 'Specifies the explicit level-of-detail from which to fetch texels.',
                    },
                ],
            },
            {
                name: 'textureProjLodOffset',
                summary: 'Perform a texture lookup with projection and explicit level-of-detail and offset.',
                parameters: [
                    {
                        name: 'sampler',
                        summary:
                            'Specifies the sampler to which the texture from which texels will be retrieved is bound.',
                    },
                    {
                        name: 'P',
                        summary: 'Specifies the texture coordinates at which texture will be sampled.',
                    },
                    {
                        name: 'lod',
                        summary: 'Specifies the explicit level-of-detail from which to fetch texels.',
                    },
                    {
                        name: 'offset',
                        summary: 'Specifies the offset, in texels, to be applied to P before fetching texels.',
                    },
                ],
            },
            {
                name: 'textureProjOffset',
                summary: 'Perform a texture lookup with projection and offset.',
                parameters: [
                    {
                        name: 'sampler',
                        summary:
                            'Specifies the sampler to which the texture from which texels will be retrieved is bound.',
                    },
                    {
                        name: 'P',
                        summary: 'Specifies the texture coordinates at which the texture will be sampled.',
                    },
                    {
                        name: 'offset',
                        summary: 'Specifies the offset that is applied to P before sampling occurs.',
                    },
                    {
                        name: 'bias',
                        summary: 'Specifies an optional bias to be applied during level-of-detail computation.',
                    },
                ],
            },
            {
                name: 'textureSize',
                summary: 'Retrieve the dimensions of a level of a texture.',
                parameters: [
                    {
                        name: 'sampler',
                        summary: 'Specifies the sampler to which the texture whose dimensions to retrieve is bound.',
                    },
                    {
                        name: 'lod',
                        summary: 'Specifies the level of the texture for which to retrieve the dimensions.',
                    },
                ],
            },
            {
                name: 'determinant',
                summary: 'Calculate the determinant of a matrix.',
                parameters: [
                    {
                        name: 'm',
                        summary: 'Specifies the matrix of which to take the determinant.',
                    },
                ],
            },
            {
                name: 'inverse',
                summary: 'Calculate the inverse of a matrix.',
                parameters: [
                    {
                        name: 'm',
                        summary: 'Specifies the matrix of which to take the inverse.',
                    },
                ],
            },
            {
                name: 'matrixCompMult',
                summary: 'Perform a component-wise multiplication of two matrices.',
                parameters: [
                    {
                        name: 'x',
                        summary: 'Specifies the first matrix multiplicand.',
                    },
                    {
                        name: 'y',
                        summary: 'Specifies the second matrix multiplicand.',
                    },
                ],
            },
            {
                name: 'outerProduct',
                summary: 'Calculate the outer product of a pair of vectors.',
                parameters: [
                    {
                        name: 'c',
                        summary: 'Specifies the parameter to be treated as a column vector.',
                    },
                    {
                        name: 'r',
                        summary: 'Specifies the parameter to be treated as a row vector.',
                    },
                ],
            },
            {
                name: 'transpose',
                summary: 'Calculate the transpose of a matrix.',
                parameters: [
                    {
                        name: 'm',
                        summary: 'Specifies the matrix of which to take the transpose.',
                    },
                ],
            },
            {
                name: 'texture2DLodEXT',
                parameters: [
                    {
                        name: 'sampler',
                    },
                    {
                        name: 'coord',
                    },
                    {
                        name: 'lod',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                name: 'texture2DProjLodEXT',
                parameters: [
                    {
                        name: 'sampler',
                    },
                    {
                        name: 'coord',
                    },
                    {
                        name: 'lod',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                name: 'texture2DProjLodEXT',
                parameters: [
                    {
                        name: 'sampler',
                    },
                    {
                        name: 'coord',
                    },
                    {
                        name: 'lod',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                name: 'textureCubeLodEXT',
                parameters: [
                    {
                        name: 'sampler',
                    },
                    {
                        name: 'coord',
                    },
                    {
                        name: 'lod',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                name: 'texture2DGradEXT',
                parameters: [
                    {
                        name: 'sampler',
                    },
                    {
                        name: 'P',
                    },
                    {
                        name: 'dPdx',
                    },
                    {
                        name: 'dPdy',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                name: 'texture2DProjGradEXT',
                parameters: [
                    {
                        name: 'sampler',
                    },
                    {
                        name: 'P',
                    },
                    {
                        name: 'dPdx',
                    },
                    {
                        name: 'dPdy',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                name: 'texture2DProjGradEXT',
                parameters: [
                    {
                        name: 'sampler',
                    },
                    {
                        name: 'P',
                    },
                    {
                        name: 'dPdx',
                    },
                    {
                        name: 'dPdy',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
            {
                name: 'textureCubeGradEXT',
                parameters: [
                    {
                        name: 'sampler',
                    },
                    {
                        name: 'P',
                    },
                    {
                        name: 'dPdx',
                    },
                    {
                        name: 'dPdy',
                    },
                ],
                stage: 'fragment',
                extension: 'GL_EXT_shader_texture_lod',
            },
        ],
    ],
]);
