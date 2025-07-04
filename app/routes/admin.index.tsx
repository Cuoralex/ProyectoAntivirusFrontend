import { useEffect, useState } from "react";
import {
  Users,
  Briefcase,
  Building,
  Layers,
  ClipboardList,
  FolderCog,
  Network,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { useNavigate } from "@remix-run/react";

interface StatCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  link: string;
}

type Stats = {
  users: number;
  opportunities: number;
  institutions: number;
  services: number;
  serviceTypes: number;
  opportunityTypes: number;
  sectors: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function StatCard({ title, count, icon, link }: StatCardProps) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(link)}
      className="cursor-pointer p-6 flex items-center justify-between shadow dark:shadow-[0_1px_4px_rgba(255,255,255,0.1)]
hover:shadow-xl hover:dark:shadow-[0_2px_10px_rgba(255,255,255,0.3)] transition rounded-2xl  bg-white dark:bg-neutral-600"
    >
      <div>
        <h4 className="text-sm font-semibold text-gray-500 uppercase mb-1 dark:text-white">
          {title}
        </h4>
        <p className="text-3xl font-bold text-gray-800 dark:text-white">
          {count}
        </p>
      </div>
      <div className="text-gray-400 text-4xl dark:text-white">{icon}</div>
    </Card>
  );
}

export default function AdminIndex() {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    opportunities: 0,
    institutions: 0,
    services: 0,
    serviceTypes: 0,
    opportunityTypes: 0,
    sectors: 0,
  });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const endpoints = [
          { key: "users", url: "/api/v1/user" },
          { key: "opportunities", url: "/api/v1/opportunity" },
          { key: "institutions", url: "/api/v1/institution" },
          { key: "services", url: "/api/v1/services" },
          { key: "serviceTypes", url: "/api/ServiceTypes" },
          { key: "opportunityTypes", url: "/api/v1/opportunity-type" },
          { key: "sectors", url: "/api/v1/sectors" },
        ] as const;

        const results = await Promise.all(
          endpoints.map(async (ep) => {
            const res = await fetch(`${API_URL}${ep.url}`, {
              credentials: "include",
            });

            if (!res.ok) {
              console.warn(`Error al obtener ${ep.url}: ${res.status}`);
              return [];
            }

            try {
              const data = await res.json();
              return Array.isArray(data) ? data : data.data || [];
            } catch {
              return [];
            }
          })
        );

        const newStats: Stats = {
          users: 0,
          opportunities: 0,
          institutions: 0,
          services: 0,
          serviceTypes: 0,
          opportunityTypes: 0,
          sectors: 0,
        };

        endpoints.forEach((ep, i) => {
          newStats[ep.key] = Array.isArray(results[i]) ? results[i].length : 0;
        });

        setStats(newStats);
      } catch (err) {
        console.error("Error cargando estadísticas", err);
      }
    };

    fetchAll();
  }, []);

  const cards: StatCardProps[] = [
    {
      title: "Usuarios",
      count: stats.users,
      icon: <Users />,
      link: "/admin/users",
    },
    {
      title: "Oportunidades",
      count: stats.opportunities,
      icon: <Briefcase />,
      link: "/admin/opportunities",
    },
    {
      title: "Instituciones",
      count: stats.institutions,
      icon: <Building />,
      link: "/admin/institutions",
    },
    {
      title: "Servicios",
      count: stats.services,
      icon: <Layers />,
      link: "/admin/services",
    },
    {
      title: "Tipos de Servicio",
      count: stats.serviceTypes,
      icon: <ClipboardList />,
      link: "/admin/service-types",
    },
    {
      title: "Tipos de Oportunidad",
      count: stats.opportunityTypes,
      icon: <FolderCog />,
      link: "/admin/opportunity-types",
    },
    {
      title: "Sectores",
      count: stats.sectors,
      icon: <Network />,
      link: "/admin/sectors",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, idx) => (
        <StatCard key={idx} {...card} />
      ))}
    </div>
  );
}
