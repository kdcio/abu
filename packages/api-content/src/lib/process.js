import debug from "debug";
import convert from "./convert";
import put from "../s3/put";

const process = async ({ key, data, options }) => {
  debug("resize:options")(JSON.stringify(options));
  if (key === "opt-orig") {
    // copy
    await put({ Key: options.target, data: data.Body });
  } else {
    const resized = await convert({ data: data.Body, options });
    await put({ Key: options.target, data: resized });
  }
};

export default process;
