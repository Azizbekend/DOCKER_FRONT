import { RegistrationProps } from "./services/registration-service";
import { RegistrationView } from "./view";

export const Registration = ({ show, onClose }: RegistrationProps) => {
    return <RegistrationView show={show} onClose={onClose} />
}
