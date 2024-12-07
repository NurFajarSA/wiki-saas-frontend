import { appClient, managementClient } from "@/lib/auth0"
import { PageHeader } from "@/components/page-header"

import { DisplayNameForm } from "./display-name-form"

export default async function GeneralSettings() {
  const session = await appClient.getSession()
  const { data: org } = await managementClient.organizations.get({
    id: session!.user.org_id,
  })

  console.log(session);
  console.log(org);

  console.log("Environment Variables:", {
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL || "not set",
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID || "not set",
    AUTH0_ADMIN_ROLE_ID: process.env.AUTH0_ADMIN_ROLE_ID || "not set",
    AUTH0_MEMBER_ROLE_ID: process.env.AUTH0_MEMBER_ROLE_ID || "not set",
    DEFAULT_CONNECTION_ID: process.env.DEFAULT_CONNECTION_ID || "not set",
    AUTH0_MANAGEMENT_CLIENT_ID: process.env.AUTH0_MANAGEMENT_CLIENT_ID || "not set",
    NEXT_PUBLIC_AUTH0_DOMAIN: process.env.NEXT_PUBLIC_AUTH0_DOMAIN || "not set",
    AUTH0_MANAGEMENT_API_DOMAIN: process.env.AUTH0_MANAGEMENT_API_DOMAIN || "not set",
    APP_BASE_URL: process.env.APP_BASE_URL || "not set",
    CUSTOM_CLAIMS_NAMESPACE: process.env.CUSTOM_CLAIMS_NAMESPACE || "not set",
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL || "not set",
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET ? "***hidden***" : "not set",
    AUTH0_MANAGEMENT_CLIENT_SECRET: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET ? "***hidden***" : "not set",
    SESSION_ENCRYPTION_SECRET: process.env.SESSION_ENCRYPTION_SECRET ? "***hidden***" : "not set",
    AUTH0_SECRET: process.env.AUTH0_SECRET ? "***hidden***" : "not set",
  });

  return (
    <div className="space-y-2">
      <PageHeader
        title="General Settings"
        description="Update your organization's general settings."
      />

      <DisplayNameForm
        organization={{
          id: org.id,
          slug: org.name,
          displayName: org.display_name,
        }}
      />
    </div>
  )
}
