import SweetAlert from "sweetalert2";
import './styles/SweetAlert.scss';

export const ConfirmDialog = SweetAlert.mixin({
    position: 'center',
    heightAuto: false,
    showCancelButton: true,
    confirmButtonText: "Oui, je suis sûr !",
    cancelButtonText: "Non, je ne suis pas sûr",
    focusCancel: true,
})