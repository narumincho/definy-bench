import * as lib from "./lib";
import Benchmark from "benchmarkjs-pretty";

const encodeByDefinyCore = (): void => {
  lib.encodeByDefinyCore(lib.definyCoreSchemaAsDefiny);
};

const encodeByJSON = (): void => {
  lib.encodeByJSON(lib.definyCoreSchemaAsDefiny);
};

const encodeProto = (): void => {
  lib.encodeProto(lib.definyCoreSchemaAsProtoMessage);
};

const definyCoreSchemaAsDefinyBinary = lib.encodeByDefinyCore(
  lib.definyCoreSchemaAsDefiny
);

const definyCoreSchemaAsJson = lib.encodeByJSON(lib.definyCoreSchemaAsDefiny);

const definyCoreSchemaAsProtoBinary = lib.encodeProto(
  lib.definyCoreSchemaAsProtoMessage
);

const decodeDefinyCode = (): void => {
  lib.decodeDefinyCode(definyCoreSchemaAsDefinyBinary);
};

const decodeByJson = (): void => {
  lib.decodeByJson(definyCoreSchemaAsJson);
};

const decodeProto = (): void => {
  lib.decodeProto(definyCoreSchemaAsProtoBinary);
};

new Benchmark()
  .add("encodeByDefinyCore", encodeByDefinyCore)
  .add("encodeByJSON", encodeByJSON)
  .add("encodeProto", encodeProto)
  .add("decodeDefinyCode", decodeDefinyCode)
  .add("decodeByJson", decodeByJson)
  .add("decodeProto", decodeProto)
  .run();
