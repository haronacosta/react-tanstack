import { useState } from "react";
import { LoadingSpinner } from "../../shared";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../hooks";
import { State } from "../interface";

export const ListView = () => {
  const [state, setState] = useState<State>(State.All);

  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const { issuesQuery, nextPage, prevPage, page } = useIssues({
    state,
    selectedLabels,
  });

  const issues = issuesQuery.data ?? [];

  const onLabelSelected = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading ? (
          <LoadingSpinner />
        ) : issuesQuery.isError ? (
          <div>Error loading issues.</div>
        ) : (
          <>
            <IssueList issues={issues} onStageChange={setState} state={state} />
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                Showing {issues.length} issues
              </span>

              <div className="flex flex-grow ml-auto gap-2 justify-end">
                <button
                  type="button"
                  className="text-sm text-blue-500 rounded-sm px-2 py-1 hover:text-blue-600 transition-all"
                  onClick={prevPage}
                >
                  Preview
                </button>

                <span>{page}</span>

                <button
                  type="button"
                  className="text-sm text-blue-500 rounded-sm px-2 py-1 hover:text-blue-600 transition-all"
                  onClick={nextPage}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker
          onLabelSelected={onLabelSelected}
          selectedLabels={selectedLabels}
        />
      </div>
    </div>
  );
};
