import Swal from "sweetalert2";

const MySwal: typeof Swal = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success mx-5',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
})

export {MySwal}