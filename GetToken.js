//Demo code for custom authentication extensions
//Use with pipedream
export default defineComponent({
    async run({ steps, $ }) {
    //const headers = {'Content-Type': 'application/json',}
  
      // Claims to return to Entra ID
    const body = {
      data: {
        '@odata.type': 'microsoft.graph.onTokenIssuanceStartResponseData',
        actions: [
          {
            '@odata.type': 'microsoft.graph.provideClaimsForToken',
            claims: {
              correlationId: steps.trigger.event.body.data.authenticationContext.correlationId,
              apiVersion: '1.0.0',
              dateOfBirth: '01/01/2000',
              customRoles: ['Writer', 'Reader'],
              upn: steps.trigger.event.body.data.authenticationContext.user.userPrincipalName,
            },
          },
        ],
      },
    }
           
      await $.respond({
        status: 200,
        headers: {'Content-Type':'application/json',},
        body,
      })
    },
  })
  
  
  
  