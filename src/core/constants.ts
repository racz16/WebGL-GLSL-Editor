export class Constants {
    public static readonly EXTENSION_NAME = 'webgl-glsl-editor';
    public static readonly GLSL = 'glsl';

    public static readonly VERT_GLSL = 'vert.glsl';
    public static readonly VS_GLSL = 'vs.glsl';
    public static readonly VERT = 'vert';
    public static readonly VS = 'vs';
    public static readonly VERTEX_EXTS = [this.VERT_GLSL, this.VS_GLSL, this.VERT, this.VS];

    public static readonly FRAG_GLSL = 'frag.glsl';
    public static readonly FS_GLSL = 'fs.glsl';
    public static readonly FRAG = 'frag';
    public static readonly FS = 'fs';
    public static readonly FRAGMENT_EXTS = [this.FRAG_GLSL, this.FS_GLSL, this.FRAG, this.FS];

    public static readonly PREPROCESSED_GLSL = 'webgl-glsl-editor-preprocessed';

    public static readonly VEC3 = 'vec3';
    public static readonly VEC4 = 'vec4';
    public static readonly BOOL = 'bool';
    public static readonly FLOAT = 'float';
    public static readonly INT = 'int';
    public static readonly UINT = 'uint';
    public static readonly COLOR = 'color';
    public static readonly COLOUR = 'colour';

    public static readonly EMPTY = '';
    public static readonly LRB = '(';
    public static readonly RRB = ')';
    public static readonly LCB = '{';
    public static readonly RCB = '}';
    public static readonly LSB = '[';
    public static readonly RSB = ']';
    public static readonly NEW_LINE = '\n';
    public static readonly TAB = '\t';
    public static readonly SPACE = ' ';
    public static readonly COMMA = ',';
    public static readonly COLON = ':';
    public static readonly SEMICOLON = ';';
    public static readonly DOT = '.';

    public static readonly xyzw = ['x', 'y', 'z', 'w'];
    public static readonly rgba = ['r', 'g', 'b', 'a'];
    public static readonly stpq = ['s', 't', 'p', 'q'];

    public static readonly INVALID = -1;
}
