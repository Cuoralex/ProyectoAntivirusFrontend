// app/routes/opportunities/$id.jsx
import { useLoaderData } from "@remix-run/react";
import { getOpportunities } from "../utils/api";

export async function loader({ params }) {
  return getOpportunities(params.id);
}

export default function OpportunityDetail() {
  const opportunity = useLoaderData();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{opportunity.name}</h1>
      <p>{opportunity.description}</p>
    </div>
  );
}
