import * as d from "definy-core/source/data";
import * as definyCoreSchemaTypePartMap from "definy-core/schema/typePartMap";
import Benchmark from "benchmarkjs-pretty";

const typePartIdAndData: ReadonlyArray<
  d.IdAndData<d.TypePartId, d.TypePart>
> = [...definyCoreSchemaTypePartMap.typePartMap].map(
  ([typePartId, typePart]): d.IdAndData<d.TypePartId, d.TypePart> => ({
    id: typePartId,
    data: typePart,
  })
);

const encodeByDefinyCore = (): Uint8Array => {
  return new Uint8Array(
    d.List.codec(
      d.IdAndData.codec(d.TypePartId.codec, d.TypePart.codec)
    ).encode(typePartIdAndData)
  );
};

const encodeByJSON = (): string => {
  return JSON.stringify(typePartIdAndData);
};

const definyCoreBinary = encodeByDefinyCore();
const json = encodeByJSON();

const decodeDefinyCode = (): void => {
  d.List.codec(d.IdAndData.codec(d.TypePartId.codec, d.TypePart.codec)).decode(
    0,
    definyCoreBinary
  );
};

const decodeByJson = (): void => {
  JSON.parse(json);
};

new Benchmark()
  .add("encodeByDefinyCore", encodeByDefinyCore)
  .add("encodeByJSON", encodeByJSON)
  .add("decodeDefinyCode", decodeDefinyCode)
  .add("decodeByJson", decodeByJson)
  .run();
