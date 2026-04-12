import { useState } from "react";
import { ResourceListPage } from "@/modules/common/shared-crud/ResourceListPage";
import {
  EmployeeFilters,
  type EmployeeFiltersValue,
} from "@/modules/masters/employee/components/EmployeeFilters";
import {
  useEmployees,
  useDeleteEmployee,
} from "@/modules/masters/employee/hooks";
import { EmployeeDialog } from "@/modules/masters/employee/components/EmployeeDialog";
import type { Employee } from "@/modules/masters/employee/types";

export function EmployeeListPage() {
  const [filters, setFilters] = useState<Omit<EmployeeFiltersValue, "search">>({
    department: "",
    activeOnly: false,
    approvedOnly: false,
  });

  return (
    <ResourceListPage<
      Employee,
      {
        search?: string;
        department?: "HOD" | "Marketing" | "Accounts" | "Other";
        isActive?: boolean;
        isApproved?: boolean;
        page: number;
        limit: number;
        sortBy: "createdAt";
        sortDir: "desc";
      }
    >
      title="Employee"
      subtitle="Manage employees."
      newButtonText="New Employee"
      minTableWidth="min-w-[1600px]"
      emptyText="No employees found."
      deleteConfirmText="Soft delete this employee?"
      defaultSortBy="createdAt"
      hideIdColumn
      buildQuery={({ search, page, limit }) => ({
        search: search.trim() || undefined,
        department: filters.department || undefined,
        isActive: filters.activeOnly || undefined,
        isApproved: filters.approvedOnly || undefined,
        page,
        limit,
        sortBy: "createdAt",
        sortDir: "desc",
      })}
      renderFilters={({ search, setSearch }) => (
        <EmployeeFilters
          value={{ search, ...filters }}
          onChange={(next) => {
            setSearch(next.search);
            setFilters({
              department: next.department,
              activeOnly: next.activeOnly,
              approvedOnly: next.approvedOnly,
            });
          }}
        />
      )}
      columns={[
        {
          header: "Emp Id",
          getValue: (item) => item.employeeId,
          valueClassName: "font-mono text-xs",
        },
        {
          header: "Employee Name",
          getValue: (item) => item.employeeName,
          valueClassName: "font-medium text-foreground",
        },
        { header: "Department", getValue: (item) => item.department },
        {
          header: "Email",
          getValue: (item) => item.emailId,
          valueClassName: "max-w-[220px] truncate",
        },
        { header: "Contact No", getValue: (item) => item.contactNo },
        {
          header: "Address",
          getValue: (item) => item.address,
          valueClassName: "max-w-[320px] truncate",
        },
        { header: "City", getValue: (item) => item.city },
        { header: "Pincode", getValue: (item) => item.pincode },
        { header: "State", getValue: (item) => item.state },
        { header: "Country", getValue: (item) => item.country },
        { header: "Active", getValue: (item) => (item.isActive ? "Y" : "N") },
        {
          header: "Approved",
          getValue: (item) => (item.isApproved ? "Y" : "N"),
        },
      ]}
      getIdValue={(item) => item.id}
      useList={
        useEmployees as (query: {
          search?: string;
          department?: "HOD" | "Marketing" | "Accounts" | "Other";
          isActive?: boolean;
          isApproved?: boolean;
          page: number;
          limit: number;
          sortBy: "createdAt";
          sortDir: "desc";
        }) => {
          data?: {
            items: Employee[];
            meta: {
              total: number;
              totalPages: number;
              hasNextPage: boolean;
              hasPrevPage: boolean;
            };
          };
          isLoading: boolean;
          error: unknown;
          refetch: () => Promise<unknown>;
        }
      }
      useDelete={useDeleteEmployee}
      renderDialog={({ open, onOpenChange, mode, value, onSuccess }) => (
        <EmployeeDialog
          open={open}
          onOpenChange={onOpenChange}
          mode={mode}
          employee={value}
          onSuccess={onSuccess}
        />
      )}
    />
  );
}
