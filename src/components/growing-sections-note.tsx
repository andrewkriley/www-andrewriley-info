import { growingSectionsNote } from "@/data/site";

type GrowingSectionsNoteProps = {
  className?: string;
};

export function GrowingSectionsNote({ className = "" }: GrowingSectionsNoteProps) {
  return (
    <p
      className={`text-sm leading-7 text-text-secondary ${className}`.trim()}
    >
      <span className="font-semibold text-text-primary">Still building: </span>
      {growingSectionsNote}
    </p>
  );
}
