interface StatCardProps {
  label: string;
  value: string | number;
}



export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-[0_2px_4px_-1px_#0000000F,0_4px_6px_-1px_#0000001A]">
      <p className="text-xs text-neutral-400 mb-1">{label}</p>
      <p className="text-2xl font-bold text-neutral-800">{value}</p>
    </div>
  );
}
