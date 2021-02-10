// @flow
import { h, render } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import JSONdb from "simple-json-db";
import htm from "htm";

const html = htm.bind(h);

/*::
type Props = {
  sessionId: string,
  uniqueId: string,
  position: string,
};
*/
const DyadSave = (props /*: Props */) => {
  // const [count /*: number */, setCount] = useState(props.count);

  // If we don't have the necessary params, return
  if (
    props.sessionId === "" ||
    props.uniqueId === "" ||
    props.position === "" ||
    typeof parseInt(props.position) !== "number"
  ) {
    return html`{ status: "fail" }`;
  }

  const positions = [];

  const db = new JSONdb("database.json");
  if (db.has(props.sessionId)) {
    db.get(props.sessionId).forEach((
      item /*: { uniqueId: string, position: number } */,
    ) /*: void */ => {
      if (item.uniqueId !== props.uniqueId) {
	positions.push(item.position);
      }
    });
  }
  positions.push(props.position);
  db.set(props.sessionId, positions);

  const positionString = positions.reduce(
    (accumulator, currentValue) => accumulator + currentValue + ",",
    "",
  );

  return `{ "status": "success" }`;
};

export default DyadSave;
