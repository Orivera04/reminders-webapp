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
  });
}

export const SuccessAlert = (message) => {
  swal({
    title: message,
    text: ' ',
    icon: "success",
    buttons: false
  })

  setTimeout(function() {
    window.location.pathname = '/settings';
  }, 2000);
}

export const ErrorAlert = (error) => {
  swal({
    title: error,
    text: ' ',
    icon: "error",
    buttons: false
  })
}
