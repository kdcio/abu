import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as Infra from "../lib/infra";
import output from "./fixtures/output.json";

test("Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Infra.InfraStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        ...output,
      },
      MatchStyle.EXACT
    )
  );
});
