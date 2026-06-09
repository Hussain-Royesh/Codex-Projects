"use client";

import { FormEvent, useEffect, useState, type ReactNode } from "react";
import { LockKeyhole, LogOut, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { AdminContentManager } from "@/components/AdminContentManager";
import { usePreferences } from "@/components/PreferencesProvider";
import { getCurrentUser, getDashboard, login, type AuthUser, type DashboardResponse } from "@/lib/api";

const copy = {
  en: {
    eyebrow: "Admin dashboard",
    title: "Manage the national team website",
    summary: "Sign in to update players, match dates, fixtures, and protected content operations.",
    email: "Email",
    password: "Password",
    signIn: "Sign in",
    signedIn: "Signed in",
    role: "Role",
    status: "Status",
    adminAccess: "Admin permissions",
    editorAccess: "Editor permissions",
    permissions: "Permissions",
    logout: "Log out",
    loading: "Checking secure session",
    error: "Access message"
  },
  fa: {
    eyebrow: "داشبورد مدیریت",
    title: "مدیریت وب‌سایت تیم ملی",
    summary: "برای به‌روزرسانی بازیکنان، تاریخ مسابقات و عملیات محافظت‌شده وارد شوید.",
    email: "ایمیل",
    password: "رمز عبور",
    signIn: "ورود",
    signedIn: "وارد شده",
    role: "نقش",
    status: "وضعیت",
    adminAccess: "صلاحیت‌های مدیر",
    editorAccess: "صلاحیت‌های ادیتور",
    permissions: "صلاحیت‌ها",
    logout: "خروج",
    loading: "بررسی نشست امن",
    error: "پیام دسترسی"
  }
};

type DashboardState = {
  admin?: DashboardResponse;
  editor?: DashboardResponse;
  adminError?: string;
  editorError?: string;
};

export default function AdminPage() {
  const { locale } = usePreferences();
  const text = copy[locale];
  const [email, setEmail] = useState("admin@afghanistanfutsal.test");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [dashboards, setDashboards] = useState<DashboardState>({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedToken = window.localStorage.getItem("aft_admin_token");

    if (!savedToken) {
      return;
    }

    setToken(savedToken);
    setIsLoading(true);
    getCurrentUser(savedToken)
      .then((result) => {
        setUser(result.user);
        return loadDashboards(savedToken);
      })
      .catch((error: Error) => {
        setMessage(error.message);
        window.localStorage.removeItem("aft_admin_token");
        setToken(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  async function loadDashboards(activeToken: string) {
    const [adminResult, editorResult] = await Promise.allSettled([
      getDashboard("/admin/dashboard", activeToken),
      getDashboard("/editor/dashboard", activeToken)
    ]);

    setDashboards({
      admin: adminResult.status === "fulfilled" ? adminResult.value : undefined,
      editor: editorResult.status === "fulfilled" ? editorResult.value : undefined,
      adminError: adminResult.status === "rejected" ? getErrorMessage(adminResult.reason) : undefined,
      editorError: editorResult.status === "rejected" ? getErrorMessage(editorResult.reason) : undefined
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const result = await login(email, password);
      setToken(result.token);
      setUser(result.user);
      window.localStorage.setItem("aft_admin_token", result.token);
      await loadDashboards(result.token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to sign in");
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    window.localStorage.removeItem("aft_admin_token");
    setToken(null);
    setUser(null);
    setDashboards({});
    setPassword("");
  }

  if (!token || !user) {
    return (
      <section className="mx-auto min-h-screen w-[min(1180px,calc(100%-32px))] pb-24 pt-32">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-4">{text.eyebrow}</p>
            <h1 className="font-display text-4xl font-black leading-[0.98] light-text md:text-6xl">
              {text.title}
            </h1>
            <p className="mt-6 max-w-xl text-base muted-text md:text-lg">{text.summary}</p>
            <div className="mt-8 h-1.5 w-44 rounded-full afghan-rail" />
          </div>

          <form onSubmit={handleSubmit} className="admin-panel rounded-3xl p-5 md:p-8">
            <div className="mb-8 grid size-14 place-items-center rounded-2xl bg-[var(--text)] text-[var(--page-bg)]">
              <LockKeyhole size={25} />
            </div>
            <label className="field-label">
              {text.email}
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                className="field-control"
              />
            </label>
            <label className="field-label mt-5">
              {text.password}
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                className="field-control"
              />
            </label>
            <button type="submit" disabled={isLoading} className="action-primary mt-6 disabled:opacity-60">
              <ShieldCheck size={18} />
              {isLoading ? text.loading : text.signIn}
            </button>
            {message ? (
              <p className="mt-5 rounded-2xl border border-afghan-red/40 bg-afghan-red/10 p-4 text-sm font-semibold text-afghan-red">
                {text.error}: {message}
              </p>
            ) : null}
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto min-h-screen w-[min(1180px,calc(100%-32px))] space-y-6 pb-24 pt-32">
      <div className="admin-panel rounded-3xl p-5 md:p-7">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow mb-3">{text.eyebrow}</p>
            <h1 className="font-display text-3xl font-black leading-tight light-text md:text-4xl">
              {text.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm muted-text md:text-base">{text.summary}</p>
          </div>
          <button type="button" onClick={handleLogout} className="action-secondary w-fit">
            <LogOut size={17} />
            {text.logout}
          </button>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <SummaryTile icon={<UserRound size={20} />} label={text.signedIn} value={user.email} />
          <SummaryTile label={text.role} value={user.role} />
          <SummaryTile label={text.status} value={user.status} />
        </div>
      </div>

      {user.role === "admin" ? <AdminContentManager token={token} /> : null}

      <div className="grid gap-5 lg:grid-cols-2">
        <DashboardPanel
          icon={<ShieldCheck size={22} />}
          title={text.adminAccess}
          result={dashboards.admin}
          error={dashboards.adminError}
          permissionsLabel={text.permissions}
        />
        <DashboardPanel
          icon={<Sparkles size={22} />}
          title={text.editorAccess}
          result={dashboards.editor}
          error={dashboards.editorError}
          permissionsLabel={text.permissions}
        />
      </div>
    </section>
  );
}

function SummaryTile({ icon, label, value }: { icon?: ReactNode; label: string; value: string }) {
  return (
    <div className="admin-row rounded-2xl p-4">
      <p className="flex items-center gap-2 text-xs font-black uppercase muted-text">
        {icon}
        {label}
      </p>
      <p className="mt-1 break-words text-base font-black light-text md:text-lg">{value}</p>
    </div>
  );
}

function DashboardPanel({
  icon,
  title,
  result,
  error,
  permissionsLabel
}: {
  icon: ReactNode;
  title: string;
  result?: DashboardResponse;
  error?: string;
  permissionsLabel: string;
}) {
  return (
    <article className="admin-panel rounded-3xl p-5 md:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-2xl bg-[var(--text)] text-[var(--page-bg)]">
          {icon}
        </div>
        <div>
          <h2 className="font-display text-xl font-black light-text md:text-2xl">{title}</h2>
          <p className="text-sm muted-text">{result?.message || error}</p>
        </div>
      </div>
      {result ? (
        <div>
          <p className="mb-3 font-mono text-sm font-black text-afghan-gold">{permissionsLabel}</p>
          <div className="flex flex-wrap gap-2">
            {result.permissions.map((permission) => (
              <span
                key={permission}
                className="rounded-full border border-[var(--line)] bg-[var(--field-bg)] px-3 py-1 text-xs font-bold muted-text"
              >
                {permission}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Request failed";
}
