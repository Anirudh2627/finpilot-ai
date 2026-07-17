import AgentCard from './AgentCard'

export default function AgentTimeline({ data }) {
  const agents = data?.agent_trace || []
  return (
    <section className="w-full">
      <div className="animate-fade-in-up">
        <h3 className="text-lg font-semibold text-white">Agent Thinking Process</h3>
        <p className="text-xs text-gray-400 mt-1">Planner → Market → News → Risk → Decision → Trust</p>
      </div>
      <div className="mt-4 relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-800" />
        <div className="space-y-3">
          {agents.map((a, idx) => (
            <AgentCard key={a.id} agent={a} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}