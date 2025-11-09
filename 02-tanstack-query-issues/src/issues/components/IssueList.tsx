import { GithubIssue, State } from "../interface";
import { IssueItem } from "./IssueItem";

interface IssueListProps {
  issues?: GithubIssue[];
  onStageChange?: (state: State) => void;
  state?: State;
}

export const IssueList = ({ issues, onStageChange, state }: IssueListProps) => {
  return (
    <>
      {/* Botones de All, Open, Closed */}
      <div className="flex gap-4">
        <button className={`btn ${state === State.All ? "active" : ""}`} onClick={() => onStageChange?.(State.All)}>All</button>
        <button className={`btn ${state === State.Open ? "active" : ""}`} onClick={() => onStageChange?.(State.Open)}>Open</button>
        <button className={`btn ${state === State.Closed ? "active" : ""}`} onClick={() => onStageChange?.(State.Closed)}>Closed</button>
      </div>

      {/* Lista de issues */}
      <div className="mt-4">
        {issues?.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </>
  );
};
