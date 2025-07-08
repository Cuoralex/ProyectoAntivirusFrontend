// app/routes/opportunities/$id.jsx
import { useLoaderData } from "@remix-run/react";
import { getOpportunities } from "../utils/api";
import { redirect } from "@remix-run/node";
import { getUserSession } from "~/utils/session.server";

export async function loader({ params, request }) {
  const session = await getUserSession(request);
  if (!session || !session.userId) {
    return redirect("/auth/login");
  }
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
