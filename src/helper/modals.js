import swal from 'sweetalert';

export const areYouSureAlert = (title, text, handleDelete) => {
  swal({
    title: title,
    text: text,
    icon: "warning",
    buttons: true,
    dangerMode: true,
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
