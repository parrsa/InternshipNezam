import { Button } from "@/app/components/ui/Button";
import { Plus } from "lucide-react";
import TablePart from "./components";

const infoData = [
  { id: 1, title: "کل", number: 127 },
  { id: 2, title: "صادر شده", number: 124 },
  { id: 3, title: "در انتظار", number: 3 },
];

function Certificates() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 sm:px-5 p-2">
      <div className="sm:flex w-full items-center justify-between gap-4 pt-2">
        <div className="grid sm:w-2/5 lg:grid-cols-3 sm:grid-rows-[130px] gap-4">
          {infoData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-start justify-center gap-2 rounded-2xl border border-neutral-300 bg-white p-4 shadow-sm"
            >
              <p className="text-2xs font-medium text-neutral-500">
                {item.title}
              </p>
              <p className="text-xl font-bold text-black">{item.number}</p>
            </div>
          ))}
        </div>
        <div className=" sm:max-w-none flex items-center justify-center mt-4 ">
          <Button
            type="button"
            variant="solid"
            color="input"
            className="text-xs font-semibold"
            size="xs"
            rounded="lg"
            leftIcon={<Plus className="h-5 w-5" />}
          >
            صدور گواهی
          </Button>
        </div>
      </div>

      <TablePart />
    </div>
  );
}

export default Certificates;
