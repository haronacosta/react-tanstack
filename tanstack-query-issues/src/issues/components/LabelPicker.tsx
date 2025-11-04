import { useLabels } from "../hooks/useLabels";
import { LoadingSpinner } from "../../shared/components/LoadingSpinner";

interface LabelPickerProps {
  onLabelSelected: (label: string) => void;
  selectedLabels: string[];
}

export const LabelPicker = ({
  onLabelSelected,
  selectedLabels,
}: LabelPickerProps) => {
  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {labelsQuery.data?.map((label) => (
        <span
          key={label.id}
          onClick={() => onLabelSelected(label.name)}
          className={`animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer text-white
            ${selectedLabels.includes(label.name) ? "selected-label" : ""}
          `}
          style={{ border: `1px solid #${label.color}` }}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
