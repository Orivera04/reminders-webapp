import swal from 'sweetalert';
import i18n from "i18next";

export const areYouSureAlert = (title, text, handleDelete) => {
  swal({
    title: title,
    text: text,
    icon: "warning",
    buttons: true,
    dangerMode: true,
    buttons: [i18n.t('modals.cancel'), i18n.t('modals.confirm')],
  })
  .then((willDelete) => {
    if (!willDelete) return;
    handleDelete();
  });
}

export const successAlert = (message) => {
  return (
    swal({
      title: message,
      text: ' ',
      icon: "success"
    })
  );
}

export const errorAlert = (error, text) => {
  swal({
    title: error,
    text: text || ' ',
    icon: "error"
  })
}
