import "./generated/schema_pb";
import * as d from "definy-core/source/data";

/**
 * このファイルのコードを自動生成してくれるツール,
 * - ts-protoc-gen がうまく動かなかった
 * - definy core との型がうまくあわないところがある
 * ので, 書いた
 *
 * このコードを読めば proto の 型がどれだけゆるいかがわかるだろう
 */

/**
 * definy core の List (IdAndData TypePartId TypePart) を protoの TypePartIdAndTypeList に 変換する
 */
export const typePartIdAndTypePartListToProtoMessage = (
  idAndDataList: d.List<d.IdAndData<d.TypePartId, d.TypePart>>
): proto.TypePartIdAndTypePartList => {
  return new proto.TypePartIdAndTypePartList().setValueList(
    idAndDataList.map(typePartIdAndDataToProtoMessage)
  );
};

const typePartIdAndDataToProtoMessage = (
  idAndData: d.IdAndData<d.TypePartId, d.TypePart>
): proto.TypePartIdAndData => {
  return new proto.TypePartIdAndData()
    .setTypePartId(new Uint8Array(d.encodeId(idAndData.id)))
    .setTypePart(typePartToProtoMessage(idAndData.data));
};

const typePartToProtoMessage = (typePart: d.TypePart): proto.TypePart => {
  return new proto.TypePart()
    .setName(typePart.name)
    .setDescription(typePart.description)
    .setProjectId(typePart.projectId)
    .setAttribute(typeAttributeMaybeToProtoMessage(typePart.attribute))
    .setTypeParameterList(
      typePart.typeParameterList.map(typeParameterToProtoMessage)
    )
    .setBody(typePartBodyToProtoMessage(typePart.body));
};

const typeAttributeMaybeToProtoMessage = (
  typeAttribute: d.Maybe<d.TypeAttribute>
): proto.TypeAttribute => {
  if (typeAttribute._ === "Nothing") {
    return proto.TypeAttribute.NONE;
  }
  switch (typeAttribute.value) {
    case "AsBoolean":
      return proto.TypeAttribute.AS_BOOLEAN;
    case "AsUndefined":
      return proto.TypeAttribute.AS_UNDEFINED;
  }
};

const typeParameterToProtoMessage = (
  typeParameter: d.TypeParameter
): proto.TypeParameter => {
  return new proto.TypeParameter()
    .setName(typeParameter.name)
    .setTypePartId(new Uint8Array(d.encodeId(typeParameter.typePartId)));
};

const typePartBodyToProtoMessage = (
  typePartBody: d.TypePartBody
): proto.TypePartBody => {
  switch (typePartBody._) {
    case "Sum":
      return new proto.TypePartBody().setSum(
        new proto.Sum().setPatternList(
          typePartBody.patternList.map(patternToProtoMessage)
        )
      );
    case "Product":
      return new proto.TypePartBody().setProduct(
        new proto.Product().setMemberList(
          typePartBody.memberList.map(memberToProtoMessage)
        )
      );
    case "Kernel":
      return new proto.TypePartBody().setKernel(
        typePartBodyKernelToProtoMessage(typePartBody.typePartBodyKernel)
      );
  }
};

const patternToProtoMessage = (pattern: d.Pattern): proto.Pattern => {
  const builder = new proto.Pattern();

  builder.setName(pattern.name);
  builder.setDescription(pattern.description);
  if (pattern.parameter._ === "Just") {
    builder.setParameter(typeToProtoMessage(pattern.parameter.value));
  }
  return builder;
};

const memberToProtoMessage = (member: d.Member): proto.Member => {
  return new proto.Member()
    .setName(member.name)
    .setDescription(member.description)
    .setType(typeToProtoMessage(member.type));
};

const typeToProtoMessage = (type: d.Type): proto.Type => {
  return new proto.Type()
    .setTypePartId(type.typePartId)
    .setParameterList(type.parameter.map(typeToProtoMessage));
};

const typePartBodyKernelToProtoMessage = (
  kernel: d.TypePartBodyKernel
): proto.TypePartBodyKernel => {
  switch (kernel) {
    case "Binary":
      return proto.TypePartBodyKernel.BINARY;
    case "Function":
      return proto.TypePartBodyKernel.FUNCTION;
    case "Id":
      return proto.TypePartBodyKernel.ID;
    case "Int32":
      return proto.TypePartBodyKernel.INT32;
    case "List":
      return proto.TypePartBodyKernel.LIST;
    case "String":
      return proto.TypePartBodyKernel.STRING;
    case "Token":
      return proto.TypePartBodyKernel.TOKEN;
  }
};
