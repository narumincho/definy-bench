# Path to this plugin
[string] $PROTOC_GEN_TS_PATH = "./node_modules/.bin/protoc-gen-ts"

# Directory to write generated code to (.js and .d.ts files)
[string] $OUT_DIR = "./generated"

# TypeScript の 出力は 
# --ts_out: protoc-gen-ts: %1 is not a valid Win32 application.
# と言われてできなかった
# ~/tool/proto/bin/protoc.exe `
#     --plugin="protoc-gen-ts=$PROTOC_GEN_TS_PATH" `
#     --js_out="import_style=commonjs,binary:$OUT_DIR" `
#     --ts_out="./" `
#     schema.proto

~/tool/proto/bin/protoc.exe `
    --plugin="protoc-gen-ts=$PROTOC_GEN_TS_PATH" `
    --js_out="import_style=commonjs,binary:$OUT_DIR" `
    schema.proto
