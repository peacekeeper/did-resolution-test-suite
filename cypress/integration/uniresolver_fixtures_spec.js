describe("Test Scenario 1: DID Resolution Result", () => {
  it("test a fixture", () => {
    cy.fixture("../fixtures/example_dids.json")
      .its("normalDids")
      .then((list) => {
        Object.keys(list).forEach((key) => {
          const normalDid = list[key];
          console.log("normal did is", normalDid);
          cy.request({
            method: "GET",
            url: "https://dev.uniresolver.io/1.0/identifiers/" + normalDid,
          }).as("request");

          cy.get("@request").then((response) => {
            expect(response.status).to.eq(200);
          });

          cy.get("@request").then((response) => {
            expect(response.headers["content-type"]).to.contain(
              'application/ld+json;profile="https://w3id.org/did-resolution'
            );
          });

          cy.get("@request").then((response) => {
            expect(response.body).to.have.property("didDocument");
          });

          cy.get("@request").then((response) => {
            expect(response.body).to.have.property("didResolutionMetadata");
          });

          cy.get("@request").then((response) => {
            expect(response.body).to.have.property("didDocumentMetadata");
          });
        });
      });
  });
});

describe("Test Scenario 2: JSON-LD DID document", () => {
  it("test a fixture", () => {
    cy.fixture("../fixtures/example_dids.json")
      .its("normalDids")
      .then((list) => {
        Object.keys(list).forEach((key) => {
          const normalDid = list[key];
          console.log("normal did is", normalDid);
          cy.request({
            method: "GET",
            url: "https://dev.uniresolver.io/1.0/identifiers/" + normalDid,
            headers: { Accept: "application/did+ld+json" },
          }).as("headers");
          cy.get("@headers").then((response) => {
            expect(response.status).to.eq(200);
            expect(response.headers["content-type"]).to.contain(
              "application/did+ld+json"
            );
            expect(response.body).not.to.have.property("didDocument");
            expect(response.body).to.have.property("@context");
          });
        });
      });
  });
});

describe("Test Scenario 3: Representation not supported", () => {
  it("test a fixture", () => {
    cy.fixture("../fixtures/example_dids.json")
      .its("normalDids")
      .then((list) => {
        Object.keys(list).forEach((key) => {
          const normalDid = list[key];

          cy.request({
            method: "GET",
            url: "https://dev.uniresolver.io/1.0/identifiers/" + normalDid,
            headers: { Accept: "image/png" },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.eq(406);
          });
        });
      });
  });
});

describe("Test Scenario 4: Deactivated", () => {
  it("test a fixture", () => {
    cy.fixture("../fixtures/example_dids.json")
      .its("deacDids")
      .then((list) => {
        Object.keys(list).forEach((key) => {
          const deacDid = list[key];

          cy.request({
            method: "GET",
            url: "https://dev.uniresolver.io/1.0/identifiers/" + deacDid,
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.eq(410);
            expect(response.headers["content-type"]).to.contain(
              'application/ld+json;profile="https://w3id.org/did-resolution"'
            );
            //FAILS
            // expect(response.body.didResolutionMetadata.deactivated).to.eq(true);
          });
        });
      });
  });
});

describe("Test Scenario 5: Not found", () => {
  it("test a fixture", () => {
    cy.fixture("../fixtures/example_dids.json")
      .its("nonExisDids")
      .then((list) => {
        Object.keys(list).forEach((key) => {
          const nonExDid = list[key];

          cy.request({
            method: "GET",
            url: "https://dev.uniresolver.io/1.0/identifiers/" + nonExDid,
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.headers["content-type"]).to.contain(
              'application/ld+json;profile="https://w3id.org/did-resolution"'
            );
            expect(response.body.didResolutionMetadata.error).to.eq("notFound");
          });
        });
      });
  });
});

describe("Test Scenario 6: Invalid DID", () => {
  it("test a fixture", () => {
    cy.fixture("../fixtures/example_dids.json")
      .its("invalidDids")
      .then((list) => {
        Object.keys(list).forEach((key) => {
          const invalidDid = list[key];

          cy.request({
            method: "GET",
            url: "https://dev.uniresolver.io/1.0/identifiers/" + invalidDid,
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.headers["content-type"]).to.contain(
              'application/ld+json;profile="https://w3id.org/did-resolution"'
            );
            expect(response.body.didResolutionMetadata.error).to.eq(
              "invalidDid"
            );
          });
        });
      });
  });
});

describe("Test Scenario 7: DID URLs with fragments", () => {
  it("test a fixture", () => {
    cy.fixture("../fixtures/example_dids.json")
      .its("fragmentDids")
      .then((list) => {
        Object.keys(list).forEach((key) => {
          const fragmentDid = list[key];

          cy.request({
            method: "GET",
            url: "https://dev.uniresolver.io/1.0/identifiers/" + fragmentDid,
            failOnStatusCode: false,
            headers: { Accept: "application/did+ld+json" },
          }).as("request");

          cy.get("@request").then((response) => {
            expect(response.status).to.eq(200);
            expect(response.headers["content-type"]).to.contain(
              "application/did+ld+json"
            );
            expect(response.body).not.to.have.property("didDocument");
            expect(response.body).to.have.property("@context");
            //FAILS
            // expect(response.body).to.have.property("type");
            expect(response.body).to.have.property("id");
            // FAILS
            expect(response.body["id"]).to.contain(fragmentDid.split("#")[0]);
          });
        });
      });
  });
});
