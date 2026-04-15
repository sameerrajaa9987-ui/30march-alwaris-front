import type { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type EditableRecordsTableHeader = {
  label: ReactNode;
  className?: string;
};

interface EditableRecordsTableProps {
  title: string;
  headers: EditableRecordsTableHeader[];
  rowsCount: number;
  emptyText: string;
  emptyColSpan: number;
  children: ReactNode;
}

export function EditableRecordsTable({
  title,
  headers,
  rowsCount,
  emptyText,
  emptyColSpan,
  children,
}: EditableRecordsTableProps) {
  return (
    <div className="space-y-2 pt-1">
      <div className="text-xs font-medium text-muted-foreground">{title}</div>
      <div className="overflow-x-auto rounded-md border border-border/70 bg-muted/10">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {headers.map((header, index) => (
                <TableHead
                  key={`${String(header.label)}-${index}`}
                  className={header.className}
                >
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rowsCount === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={emptyColSpan}
                  className="text-center text-muted-foreground"
                >
                  {emptyText}
                </TableCell>
              </TableRow>
            ) : (
              children
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
