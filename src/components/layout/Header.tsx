import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/Button";

type HeaderProps = {
  onOpenSidebar: () => void;
};

export const Header = ({ onOpenSidebar }: HeaderProps) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onOpenSidebar}
            className="px-3 py-2 lg:hidden"
            aria-label="Abrir menu"
          >
            ☰
          </Button>

          <div>
            <p className="text-sm text-slate-400">Sesion activa</p>
            <p className="text-sm font-medium text-slate-100">{user?.email}</p>
          </div>
        </div>

        <Button type="button" variant="secondary" onClick={logout}>
          Salir
        </Button>
      </div>
    </header>
  );
};
