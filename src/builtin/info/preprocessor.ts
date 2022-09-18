export const preprocessorDirectives: Array<Array<Array<string>>> = [
    [['version'], ['100', '300'], ['es']],
    [['define']],
    [['undef']],
    [['if']],
    [['ifdef']],
    [['ifndef']],
    [['else']],
    [['elif']],
    [['endif']],
    [['error']],
    [['pragma'], ['STDGL', 'optimize(on)', 'optimize(off)', 'debug(on)', 'debug(off)']],
    [
        ['extension'],
        [
            'all',
            'GL_ANGLE_multi_draw',
            'GL_EXT_draw_buffers',
            'GL_OVR_multiview2',
            'GL_OES_standard_derivatives',
            'GL_EXT_shader_texture_lod',
            'GL_EXT_frag_depth',
        ],
        ['require', 'enable', 'warn', 'disable'],
    ],
    [['line']],
];

export const preprocessorMacros: Array<string> = [
    '__LINE__',
    '__FILE__',
    '__VERSION__',
    'GL_ES',
    'GL_ANGLE_multi_draw',
    'GL_OVR_multiview2',
    'GL_OES_standard_derivatives',
    'GL_EXT_shader_texture_lod',
    'GL_EXT_frag_depth',
];
