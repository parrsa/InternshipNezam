import { Star } from "lucide-react";

interface SupervisorItem {
  id: number;
  name: string;
  field: string;
  traineeCount: number;
  score: number;
}

const SUPERVISORS: SupervisorItem[] = [
  { id: 1, name: "مهندس رضایی", field: "عمران", traineeCount: 6, score: 95 },
  { id: 2, name: "مهندس احمدی", field: "عمران", traineeCount: 5, score: 92 },
];

const faNumber = (n: number) => n.toLocaleString("fa-IR");

export default function TopSupervisors() {
  return (
    <div className=" h-81 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center p-2 justify-between">
        <h2 className="text-s font-bold text-gray-900">سرپرستان برتر</h2>
        <Star className="h-4 w-4 text-amber-500" aria-hidden="true" />
      </div>

      <ul className="mt-8">
        {SUPERVISORS.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 border-b border-gray-200 py-3 "
          >
            <div className="flex h-10 w-10  items-center justify-center rounded-full bg-indigo-100 text-sm text-indigo-700">
              {item.name.replace("مهندس ", "").charAt(0)}
            </div>

            <div className="  flex-1">
              <p className=" text-xs font-bold text-gray-900">{item.name}</p>
              <p className=" text-2xs text-gray-500">
                {item.field} — {faNumber(item.traineeCount)} کارآموز
              </p>
            </div>

            <div className="flex  items-center gap-1 text-xs font-bold text-gray-900">
              <Star className="h-4 w-4 text-amber-500" aria-hidden="true" />
              <span>{faNumber(item.score)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}