import * as lib from "./lib";
import { promises as fileSystem } from "fs";

describe("encodeDecodeMatch", () => {
  it("save file", () => {
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
  });
  it("json", () => {
    expect(
      lib.decodeByJson(lib.encodeByJSON(lib.definyCoreSchemaAsDefiny))
    ).toEqual(lib.definyCoreSchemaAsDefiny);
  });
  it("definyCore", () => {
    expect(
      lib.decodeDefinyCode(lib.encodeByDefinyCore(lib.definyCoreSchemaAsDefiny))
    ).toEqual(lib.definyCoreSchemaAsDefiny);
  });
  it("protocolBuffers", () => {
    expect(
      lib
        .decodeProto(lib.encodeProto(lib.definyCoreSchemaAsProtoMessage))
        .toObject()
    ).toEqual(lib.definyCoreSchemaAsProtoMessage.toObject());
  });
});
