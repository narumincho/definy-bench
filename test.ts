import * as lib from "./lib";
import { promises as fileSystem } from "fs";
import { strict } from "assert";

fileSystem.writeFile(
  "file/definyJson.json",
  JSON.stringify(lib.definyCoreSchemaAsDefiny)
);

fileSystem.writeFile(
  "file/definyBinary.bin",
  lib.encodeByDefinyCore(lib.definyCoreSchemaAsDefiny)
);

fileSystem.writeFile(
  "file/proto.bin",
  lib.encodeProto(lib.definyCoreSchemaAsProtoMessage)
);

strict.deepEqual(
  lib.decodeByJson(lib.encodeByJSON(lib.definyCoreSchemaAsDefiny)),
  lib.definyCoreSchemaAsDefiny,
  "json"
);

strict.deepEqual(
  lib.decodeDefinyCode(lib.encodeByDefinyCore(lib.definyCoreSchemaAsDefiny)),
  lib.definyCoreSchemaAsDefiny
);

strict.deepEqual(
  lib
    .decodeProto(lib.encodeProto(lib.definyCoreSchemaAsProtoMessage))
    .toObject(),
  lib.definyCoreSchemaAsProtoMessage.toObject()
);
