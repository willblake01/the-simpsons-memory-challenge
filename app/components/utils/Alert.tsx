import Swal from 'sweetalert2'

interface AlertProps {
  title: string
  text: string
}

export const Alert = ({ title, text }: AlertProps): void => {
  Swal.fire({
    icon: 'warning',
    confirmButtonColor: 'orange',
    title,
    text
  })
}

export default Alert
