import { MasterListPage } from "@/modules/masters/shared/MasterListPage";
import { TariffDescriptionDialog } from "@/modules/masters/tariff-description/components/TariffDescriptionDialog";
import {
  useDeleteTariffDescription,
  useTariffDescriptions,
} from "@/modules/masters/tariff-description/hooks";

export function TariffDescriptionListPage() {
  return (
    <MasterListPage
      title="Tariff Description"
      subtitle="Manage tariff descriptions."
      newButtonText="New Income Header"
      searchPlaceholder="Search description..."
      minTableWidth="min-w-[700px]"
      emptyText="No tariff descriptions found."
      deleteConfirmText="Delete this tariff description?"
      defaultSortBy="createdAt"
      columns={[
        {
          header: "Description",
          getValue: (item) => item.description,
          valueClassName: "font-medium",
        },
      ]}
      getIdValue={(item) => item.counter}
      useList={useTariffDescriptions}
      useDelete={useDeleteTariffDescription}
      renderDialog={({ open, onOpenChange, mode, value, onSuccess }) => (
        <TariffDescriptionDialog
          open={open}
          onOpenChange={onOpenChange}
          mode={mode}
          value={value}
          onSuccess={onSuccess}
        />
      )}
    />
  );
}
