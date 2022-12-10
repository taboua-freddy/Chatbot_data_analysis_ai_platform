import Swal from "sweetalert2";

const MySwal: typeof Swal = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success mx-5',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
})

const MyToast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


export {MySwal, MyToast}