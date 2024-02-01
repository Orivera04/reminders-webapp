import swal from 'sweetalert';

export const areYouSureAlert = (title, text, handleDelete) => {
  swal({
    title: title,
    text: text,
    icon: "warning",
    buttons: true,
    dangerMode: true,
    buttons: ["Select Patient?", "Speed Case?"],
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
