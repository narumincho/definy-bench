import "./generated/schema_pb";
import * as d from "definy-core/source/data";

export const typePartIdAndTypePartListFromProtoMessage = (
  idAndDataList: proto.TypePartIdAndTypePartList
): d.List<d.IdAndData<d.TypePartId, d.TypePart>> => {
  return idAndDataList.getValueList().map(typePartIdAndDataFromProtoMessage);
};

export const typePartIdAndDataFromProtoMessage = (
  idAndData: proto.TypePartIdAndData
): d.IdAndData<d.TypePartId, d.TypePart> => {
  const typePart = idAndData.getTypePart();
  if (typePart === null) {
    throw new Error("typePart is null in typePartIdAndDataFromProtoMessage");
  }
  return {
    id: d.decodeId(0, idAndData.getTypePartId_asU8()).result as d.TypePartId,
    data: typePartFromProtoMessage(typePart),
  };
};

export const typePartFromProtoMessage = (
  typePart: proto.TypePart
): d.TypePart => {
  const body = typePart.getBody();
  if (body === null) {
    throw new Error("TypePart require body");
  }
  return {
    name: typePart.getName(),
    description: typePart.getDescription(),
    projectId: d.decodeId(0, typePart.getProjectId_asU8())
      .result as d.ProjectId,
    attribute: maybeTypeAttributeFromProtoMessage(typePart.getAttribute()),
    typeParameterList: typePart
      .getTypeParameterList()
      .map(typeParameterFromProtoMessage),
    body: typePartBodyFromProtoMessage(body),
  };
};

const maybeTypeAttributeFromProtoMessage = (
  typeAttribute: proto.TypeAttribute
): d.Maybe<d.TypeAttribute> => {
  switch (typeAttribute) {
    case proto.TypeAttribute.NONE:
      return d.Maybe.Nothing();
    case proto.TypeAttribute.AS_BOOLEAN:
      return d.Maybe.Just(d.TypeAttribute.AsBoolean);
    case proto.TypeAttribute.AS_UNDEFINED:
      return d.Maybe.Just(d.TypeAttribute.AsUndefined);
  }
  throw new Error(
    "invalid type attribute in maybeTypeAttributeFromProtoMessage"
  );
};

const typeParameterFromProtoMessage = (
  typeParameter: proto.TypeParameter
): d.TypeParameter => {
  return {
    name: typeParameter.getName(),
    typePartId: d.decodeId(0, typeParameter.getTypePartId_asU8())
      .result as d.TypePartId,
  };
};

const typePartBodyFromProtoMessage = (
  typePartBody: proto.TypePartBody
): d.TypePartBody => {
  const sum = typePartBody.getSum();
  if (sum !== null) {
    return d.TypePartBody.Sum(
      sum.getPatternList().map(patternFromProtoMessage)
    );
  }
  const product = typePartBody.getProduct();
  if (product !== null) {
    return d.TypePartBody.Product(
      product.getMemberList().map(memberFromProtoMessage)
    );
  }
  const kernel = typePartBody.getKernel();
  if (kernel !== null) {
    return d.TypePartBody.Kernel(typePartBodyKernelFromProtoMessage(kernel));
  }
  throw new Error("invalid TypePartBody in typePartBodyFromProtoMessage");
};

const patternFromProtoMessage = (pattern: proto.Pattern): d.Pattern => {
  const parameter = pattern.getParameter();
  return {
    name: pattern.getName(),
    description: pattern.getDescription(),
    parameter:
      parameter === null
        ? d.Maybe.Nothing()
        : d.Maybe.Just(typeFromProtoMessage(parameter)),
  };
};

const memberFromProtoMessage = (member: proto.Member): d.Member => {
  const type = member.getType();
  if (type === null) {
    throw new Error("member required type in memberFromProtoMessage");
  }
  return {
    name: member.getName(),
    description: member.getDescription(),
    type: typeFromProtoMessage(type),
  };
};

const typeFromProtoMessage = (type: proto.Type): d.Type => {
  return {
    typePartId: d.decodeId(0, type.getTypePartId_asU8()).result as d.TypePartId,
    parameter: type.getParameterList().map(typeFromProtoMessage),
  };
};

const typePartBodyKernelFromProtoMessage = (
  kernel: proto.TypePartBodyKernel
): d.TypePartBodyKernel => {
  switch (kernel) {
    case proto.TypePartBodyKernel.BINARY:
      return d.TypePartBodyKernel.Binary;
    case proto.TypePartBodyKernel.FUNCTION:
      return d.TypePartBodyKernel.Function;
    case proto.TypePartBodyKernel.ID:
      return d.TypePartBodyKernel.Id;
    case proto.TypePartBodyKernel.INT32:
      return d.TypePartBodyKernel.Int32;
    case proto.TypePartBodyKernel.LIST:
      return d.TypePartBodyKernel.List;
    case proto.TypePartBodyKernel.STRING:
      return d.TypePartBodyKernel.String;
    case proto.TypePartBodyKernel.TOKEN:
      return d.TypePartBodyKernel.Token;
  }
  throw new Error(
    "invalid TypePartBodyKernel in typePartBodyKernelFromProtoMessage"
  );
};
