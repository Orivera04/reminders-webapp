import swal from 'sweetalert';

export const deleteAlert = (handleDelete) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover it!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      handleDelete();
      swal("Setting has been deleted!", {
        icon: "success",
      });
    }
  })
}

export const areYouSureAlert = (message, handleDelete) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover it!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (!willDelete) return;
    handleDelete();
    swal(message, { icon: "success" });
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
