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
    AUTH0_MANAGEMENT_API_DOMAIN: process.env.AUTH0_MANAGEMENT_API_DOMAIN,
    AUTH0_MANAGEMENT_CLIENT_ID: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
    AUTH0_MANAGEMENT_CLIENT_SECRET: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    SESSION_ENCRYPTION_SECRET: process.env.SESSION_ENCRYPTION_SECRET,
    APP_BASE_URL: process.env.APP_BASE_URL,
    NEXT_PUBLIC_AUTH0_DOMAIN: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
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
