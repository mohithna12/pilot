import { Sidebar } from "@/components/layout/sidebar";

export default function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { workspaceId: string };
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar workspaceId={params.workspaceId} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
