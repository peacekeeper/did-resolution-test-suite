it("Request test", () => {
    cy.request({
        method: "GET",
        url: "https://dev.uniresolver.io/1.0/identifiers/did:sov:WRfXPg8dantKVubE3HX8pw",
        failOnStatusCode: false,
    }).as("identifiers");

    cy.get('@identifiers').should((response) => {
        console.log(response.body)
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('didDocument')
        expect(response.body).to.have.property('didResolutionMetadata')
        expect(response.body).to.have.property('didDocumentMetadata')

        //todo: add fixtures to deeply equal
        // expect(response.body).to.deep.equal({
        //     didDocument: '',
        //     didResolutionMetadata: '',
        //     didDocumentMetadata: '',
        // })


    });
    });