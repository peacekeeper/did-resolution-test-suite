describe("Test 1: Normal DID Resolution Result", () => {
  beforeEach(() => {
    cy.request({
      method: "GET",
      url: "https://dev.uniresolver.io/1.0/identifiers/did:sov:WRfXPg8dantKVubE3HX8pw",
    }).as("request");
  });

  it("Should have response status 200", () => {
    cy.get("@request").then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Should have property didDocument", () => {
    cy.get("@request").then((response) => {
      expect(response.body).to.have.property("didDocument");
    });
  });
  it("Should have property didResolutionMetadata", () => {
    cy.get("@request").then((response) => {
      expect(response.body).to.have.property("didResolutionMetadata");
    });
  });
  it("Should have property didDocumentMetadata", () => {
    cy.get("@request").then((response) => {
      expect(response.body).to.have.property("didDocumentMetadata");
    });
  });
});

describe("Test 2: Only DID document", () => {
  beforeEach(() => {
    cy.request({
      method: "GET",
      url: "https://dev.uniresolver.io/1.0/identifiers/did:sov:WRfXPg8dantKVubE3HX8pw",
      headers: { Accept: "application/did+ld+json" },
    }).as("headers");
  });

  it("Should have response status 200", () => {
    cy.get("@headers").then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(200);
    });
  });

  it("Should not have property didDocument", () => {
    cy.get("@headers").then((response) => {
      expect(response.body).not.to.have.property("didDocument");
    });
  });
});

describe("Test 3: Not found", () => {
  it("Tests an error", () => {
    cy.request({
      method: "GET",
      url: "https://dev.uniresolver.io/1.0/identifiers/did:sov:WRfXPg8dantKVubE3HX8pwtest",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
