import { FormEntityDetails } from "./app/components/forms/entity-details.component";
import { FormFieldContainer } from "./app/components/forms/field-container.component";
import { TableHeader } from "./app/components/table/header.component";
import { AppConfigurator } from "./app/layout/component/app.configurator";
import { AppFloatingConfigurator } from "./app/layout/component/app.floatingconfigurator";

export const COMPONENTS = [
    AppFloatingConfigurator,
    AppConfigurator,
    FormFieldContainer,
    FormEntityDetails,
    TableHeader,
]