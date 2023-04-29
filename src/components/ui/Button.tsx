import Link from 'next/link'
import classes from './button.module.css'

interface ButtonProps {
  children: React.ReactNode
  link: string
}
const Button = ({ children, link }: ButtonProps) => {
  return (
    <Link href={link} className={classes.btn}>
      {children}
    </Link>
  )
}

export default Button
