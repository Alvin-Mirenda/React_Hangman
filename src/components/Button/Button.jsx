export const Button = ({children,variant,onClick}) => {
    const bouton =  
    `${variant === 'classic' ? 'button--classic' : ''} `

    return (
        <button className={bouton} onClick={onClick}>{children}</button>
    )
}