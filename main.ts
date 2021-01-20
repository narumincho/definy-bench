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

export const encodeByDefinyCore = (): void => {
  d.List.codec(d.IdAndData.codec(d.TypePartId.codec, d.TypePart.codec)).encode(
    typePartIdAndData
  );
};

export const encodeByJSON = (): void => {
  JSON.stringify(typePartIdAndData);
};

new Benchmark()
  .add("encodeByDefinyCore", encodeByDefinyCore)
  .add("encodeByJSON", encodeByJSON)
  .run();
