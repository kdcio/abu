import makeDDB from "../../../src/ddb/ddb";

describe("Make DDB", () => {
  beforeAll(async () => {
    delete process.env.DDB_ENDPOINT;
  });

  it("should make DDB", async () => {
    const ddb = makeDDB();
    expect(ddb.TableName).toBe("abu-test-admin");
  });
});
