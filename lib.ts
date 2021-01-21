import * as d from "definy-core/source/data";
import * as definyCoreSchemaTypePartMap from "definy-core/schema/typePartMap";
import * as definyFromProto from "./definyFromProto";
import * as definyToProto from "./definyToProto";

export const encodeByDefinyCore = (
  typePartIdAndTypePartList: d.List<d.IdAndData<d.TypePartId, d.TypePart>>
): Uint8Array => {
  return new Uint8Array(
    d.List.codec(
      d.IdAndData.codec(d.TypePartId.codec, d.TypePart.codec)
    ).encode(typePartIdAndTypePartList)
  );
};

export const encodeByJSON = (
  typePartIdAndTypePartList: d.List<d.IdAndData<d.TypePartId, d.TypePart>>
): string => {
  return JSON.stringify(typePartIdAndTypePartList);
};

export const encodeProtoFromDefinyStyleValue = (
  typePartIdAndTypePartList: d.List<d.IdAndData<d.TypePartId, d.TypePart>>
): Uint8Array => {
  return encodeProto(
    definyToProto.typePartIdAndTypePartListToProtoMessage(
      typePartIdAndTypePartList
    )
  );
};

export const encodeProto = (
  typePartIdAndTypePartList: proto.TypePartIdAndTypePartList
): Uint8Array => {
  return typePartIdAndTypePartList.serializeBinary();
};

export const decodeDefinyCode = (
  definyCoreBinary: Uint8Array
): d.List<d.IdAndData<d.TypePartId, d.TypePart>> => {
  return d.List.codec(
    d.IdAndData.codec(d.TypePartId.codec, d.TypePart.codec)
  ).decode(0, definyCoreBinary).result;
};

export const decodeByJson = (
  json: string
): d.List<d.IdAndData<d.TypePartId, d.TypePart>> => {
  return JSON.parse(json) as d.List<d.IdAndData<d.TypePartId, d.TypePart>>;
};

export const decodeProto = (
  protoBinary: Uint8Array
): proto.TypePartIdAndTypePartList => {
  return proto.TypePartIdAndTypePartList.deserializeBinary(protoBinary);
};

export const decodeProtoAndToDefinyStyleValue = (
  protoBinary: Uint8Array
): d.List<d.IdAndData<d.TypePartId, d.TypePart>> => {
  return definyFromProto.typePartIdAndTypePartListFromProtoMessage(
    decodeProto(protoBinary)
  );
};

export const definyCoreSchemaAsDefiny: d.List<
  d.IdAndData<d.TypePartId, d.TypePart>
> = [...definyCoreSchemaTypePartMap.typePartMap].map(
  ([typePartId, typePart]): d.IdAndData<d.TypePartId, d.TypePart> => ({
    id: typePartId,
    data: typePart,
  })
);

export const definyCoreSchemaAsProtoMessage = definyToProto.typePartIdAndTypePartListToProtoMessage(
  definyCoreSchemaAsDefiny
);
