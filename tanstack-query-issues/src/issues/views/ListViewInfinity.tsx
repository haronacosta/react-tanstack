import { useState } from "react";
import { LoadingSpinner } from "../../shared";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssuesInfinity } from "../hooks";
import { State } from "../interface";

export const ListViewInfinity = () => {
  const [state, setState] = useState<State>(State.All);

  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const { issuesQuery } = useIssuesInfinity({
    state,
    selectedLabels,
  });

  // Flatten pages coming from an infinite query into a single array of issues
  const issues = issuesQuery.data ? issuesQuery.data.pages.flat() : [];

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
            <div className="flex flex-col justify-center">
              <IssueList
                issues={issues}
                onStageChange={setState}
                state={state}
              />
              <div className="flex justify-center items-center mt-4">
                <button
                  onClick={() => issuesQuery.fetchNextPage()}
                  type="button"
                  className="text-md bg-blue-500 text-white w-full rounded-sm px-2 py-1 hover:bg-blue-600 transition-all disabled:bg-slate-500"
                  disabled={!issuesQuery.hasNextPage || issuesQuery.isFetchingNextPage}
                >
                 {
                    issuesQuery.isFetchingNextPage
                      ? "Loading..."
                      : issuesQuery.hasNextPage
                      ? "Load More"
                      : "No more issues to load"
                 }
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
