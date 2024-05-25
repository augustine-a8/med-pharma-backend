describe("Database Connection Test Suite", () => {
  it("should use the correct database url", () => {
    const dbUrl = process.env.DATABASE_URL;
    expect(dbUrl).toBe(
      "mongodb+srv://augustine_a:CxTEB8gAOTJEPlgo@cluster0.beivtz8.mongodb.net/med-pharma-test?retryWrites=true&w=majority&appName=Cluster0"
    );
  });
});
