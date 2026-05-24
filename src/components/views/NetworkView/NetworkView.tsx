import { Coffee, GitBranch, CalendarDays, UserPlus } from "lucide-react";
import { useAppStore } from "@core/store/useAppStore";
import { NetworkCard } from "@components/NetworkCard/NetworkCard";
import { StatCard } from "@components/StatCard/StatCard";
import "./NetworkView.scss";

export const NetworkView = () => {
  const network = useAppStore((s) => s.network);

  const totalNetworkActions =
    network.coffeeChats +
    network.referrals +
    network.events +
    network.connections;

  return (
    <div className="network-view">
      <section className="network-view__section">
        <h2 className="network-view__heading">Overview</h2>
        <div className="network-view__overview">
          <StatCard
            label="Total interactions"
            value={totalNetworkActions}
            sub="Click cards below to log"
          />
          <StatCard
            label="Referrals"
            value={network.referrals}
            accent={network.referrals > 0}
            sub="Highest-value channel"
          />
        </div>
      </section>

      <section className="network-view__section">
        <h2 className="network-view__heading">Log activity</h2>
        <p className="network-view__hint">
          Click any card to increment the counter.
        </p>
        <div className="network-view__grid">
          <NetworkCard
            label="Coffee Chats"
            count={network.coffeeChats}
            icon={Coffee}
            networkKey="coffeeChats"
          />
          <NetworkCard
            label="Referrals"
            count={network.referrals}
            icon={GitBranch}
            networkKey="referrals"
          />
          <NetworkCard
            label="Events"
            count={network.events}
            icon={CalendarDays}
            networkKey="events"
          />
          <NetworkCard
            label="Connections"
            count={network.connections}
            icon={UserPlus}
            networkKey="connections"
          />
        </div>
      </section>
    </div>
  );
};
