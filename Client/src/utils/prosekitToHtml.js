import { DOMSerializer } from "prosemirror-model";

export function prosekitToHtmlFromEditor(jsonString, editor) {
  const json = JSON.parse(jsonString);

  const schema = editor.view.state.schema;
  const doc = schema.nodeFromJSON(json);

  const serializer = DOMSerializer.fromSchema(schema);
  const fragment = serializer.serializeFragment(doc.content);

  const container = document.createElement("div");
  container.appendChild(fragment);

  return container.innerHTML;
}
