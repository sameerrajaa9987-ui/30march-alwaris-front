import { Link } from "react-router-dom";
import { UserCircle2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { clearAuth } from "@/modules/auth/authSlice";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";

export function Topbar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  return (
    <header className="sticky top-0 z-10 border-b border-border/70 bg-card/95 backdrop-blur">
      <div className="flex h-14 items-center gap-3 px-4">
        <SidebarTrigger className="text-foreground/70 hover:text-foreground" />

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          <ModeToggle />
          <div className="hidden sm:block text-right">
            <div className="text-sm font-semibold text-foreground">
              {user?.name || "User"}
            </div>
            <div className="text-xs text-muted-foreground">
              {user?.role || ""}
            </div>
          </div>
          <UserCircle2 className="h-8 w-8 text-primary/70" />
          <Link
            to="/logout"
            onClick={() => dispatch(clearAuth())}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
}
