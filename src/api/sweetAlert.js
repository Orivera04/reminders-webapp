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
    } else {
      swal("Setting is safe!");
    }
  });
}
