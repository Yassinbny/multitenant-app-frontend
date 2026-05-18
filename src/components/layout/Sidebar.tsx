import { NavLink } from "react-router";
import type { UserRole } from "../../features/auth/auth.types";
import { useAuth } from "../../hooks/useAuth";
import { clsx } from "clsx";
import { Button } from "../ui/Button";

type NavItem = {
  label: string;
  to: string;
  roles: UserRole[];
};

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    to: "/dashboard",
    roles: ["SUPER_ADMIN", "ADMIN", "USER"],
  },
  {
    label: "Tenants",
    to: "/tenants",
    roles: ["SUPER_ADMIN"],
  },
  {
    label: "Usuarios",
    to: "/users",
    roles: ["ADMIN"],
  },
  {
    label: "Partes",
    to: "/submissions",
    roles: ["ADMIN", "USER"],
  },
  {
    label: "Escena",
    to: "/scene",
    roles: ["ADMIN", "USER"],
  },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { user } = useAuth();

  const visibleItems = navItems.filter((item) =>
    user ? item.roles.includes(user.role) : false,
  );

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-20 bg-slate-950/70 lg:hidden"
          aria-label="Cerrar menu"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-30 w-64 border-r border-slate-800 bg-slate-950 px-4 py-6 transition-transform lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:block",
        )}
      >
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-cyan-400">Multitenant</p>
            <h1 className="mt-1 text-lg font-semibold text-slate-100">
              Accident Reports
            </h1>
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="px-2 py-1 lg:hidden"
            aria-label="Cerrar menu"
          >
            ✕
          </Button>
        </div>

        <nav className="space-y-1">
          {visibleItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  "block rounded-md px-3 py-2 text-sm transition",
                  isActive
                    ? "bg-cyan-400 text-slate-950"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};
