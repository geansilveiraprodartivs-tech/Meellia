import { useState, type ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import type { View } from '../../types';

interface Props {
  current: View;
  onNavigate: (v: View) => void;
  title: string;
  children: ReactNode;
}

export default function DashboardLayout({ current, onNavigate, title, children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (v: View) => {
    onNavigate(v);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar
        current={current}
        onNavigate={navigate}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar title={title} onOpenMobile={() => setMobileOpen(true)} />
        <main className="flex-1 px-4 sm:px-8 py-6 sm:py-10">{children}</main>
      </div>
    </div>
  );
}
