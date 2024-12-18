import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

import { appClient } from "@/lib/auth0"

export default async function DashboardHome() {
  const session = await appClient.getSession();

  if (!session || !session.user) {
    console.error("Session not found or invalid.");
    // Redirect to login page or show error message
    return (
      <div className="flex flex-1 flex-grow flex-col gap-4 lg:gap-6">
        <p className="text-center text-red-500">Session is not available. Please log in.</p>
      </div>
    );
  }

  const { org_id } = session.user;

  const getUrl = async (org_id: string) => {
    const response = await fetch(process.env.SAAS_BASE_URL + "/wiki/" + org_id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  const { url } = await getUrl(org_id);

  return (
    <div className="flex flex-1 flex-grow flex-col gap-4 lg:gap-6">
      <div className="flex flex-1 items-center justify-center rounded-3xl border bg-field shadow-sm">
        <div className="flex max-w-[500px] flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">WikiJs berhasil dibuat!</h3>
          <p className="mt-3 text-muted-foreground">
            Selamat datang di WikiJs! WikiJs adalah platform wiki yang dapat
            membantu Anda dan tim Anda untuk membuat dan berbagi pengetahuan bersama.
          </p>
          <p className="mt-3 text-muted-foreground">
            Untuk mulai menggunakan WikiJs, silakan klik tombol di bawah ini.
          </p>
          <div className="mt-8">
            <Link className="w-full" href={url || "/"}>
              <Button className="w-full">
                WikiJs Dashboard
                <ArrowRightIcon className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

